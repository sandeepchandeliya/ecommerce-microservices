import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "Product",
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Inventory", inventorySchema);
