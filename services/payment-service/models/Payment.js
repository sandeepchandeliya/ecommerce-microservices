import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    method: { type: String, default: "card" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
