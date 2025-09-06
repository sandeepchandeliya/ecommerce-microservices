import Inventory from "../models/Inventory.js";

// Get stock of a product
export const getStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const inventory = await Inventory.findOne({ productId });

    if (!inventory) return res.status(404).json({ message: "Product not found in inventory" });

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add product to inventory (admin use)
export const addProduct = async (req, res) => {
  try {
    const { productId, stock } = req.body;

    const existing = await Inventory.findOne({ productId });
    if (existing) return res.status(400).json({ message: "Product already exists in inventory" });

    const newItem = await Inventory.create({ productId, stock });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Decrease stock (after order paid)
export const decreaseStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findOne({ productId });
    if (!inventory) return res.status(404).json({ message: "Product not found in inventory" });

    if (inventory.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    inventory.stock -= quantity;
    await inventory.save();

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Increase stock (cancel/refund)
export const increaseStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findOne({ productId });
    if (!inventory) return res.status(404).json({ message: "Product not found in inventory" });

    inventory.stock += quantity;
    await inventory.save();

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
