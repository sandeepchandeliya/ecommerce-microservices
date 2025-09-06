import 'dotenv/config';
import Payment from "../models/Payment.js";
import axios from "axios";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const makePayment = async (req, res) => {
  const { orderId, token } = req.body;
  const userId = req.user.id;

  try {
    // 1️⃣ Get order details from order-service
    const orderRes = await axios.get(`http://localhost:8004/order/${orderId}`, {
      headers: { Authorization: req.headers.authorization },
    });

    const order = orderRes.data;
    if (!order) return res.status(404).json({ message: "Order not found" });

  // 🚨 Prevent duplicate payments
    if (order.status === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }


    // 2️⃣ Create PaymentIntent via Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalAmount * 100, // in paise/cents
      currency: "inr",
      payment_method: token,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });

    // 3️⃣ Save payment record
    const payment = await Payment.create({
      orderId,
      userId,
      amount: order.totalAmount,
      status: "success",
      method: "card",
    });

    // 4️⃣ Update order status → "paid"
    await axios.patch(
      `http://localhost:8004/order/${orderId}/status`,
      { status: "paid" },
      { headers: { Authorization: req.headers.authorization } }
    );

    // 5️⃣ Update inventory (decrease stock for each item)
    for (const item of order.items) {
      await axios.patch(
        `http://localhost:8006/inventory/${item.productId}/decrease`,
        { quantity: item.quantity }
      );
    }

    res.json({ message: "Payment successful", payment, paymentIntent });
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Payment failed",
      error: error.response?.data || error.message,
    });
  }
};