// src/controllers/orderController.js
import Order from "../models/Order.js";
import axios from "axios";

export const checkout = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1️⃣ Fetch cart from cart-service
    const cartResponse = await axios.get(`http://localhost:8003/cart`, {
      headers: { Authorization: req.headers.authorization },
    });
    const cart = cartResponse.data;

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Validate products and calculate total
    const validatedItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const productRes = await axios.get(
        `http://localhost:8002/api/products/${item.productId}`
      );
      const product = productRes.data;

      validatedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    // 3️⃣ Create order
    const order = await Order.create({
      userId,
      items: validatedItems,
      totalAmount,
    });

    // 4️⃣ Clear cart: delete each item individually
    for (const item of cart.items) {
      await axios.delete(`http://localhost:8003/cart/${item.productId}`, {
        headers: { Authorization: req.headers.authorization },
      });
    }

    res.json(order);
  } catch (error) {
    console.error(
      "Checkout error:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};