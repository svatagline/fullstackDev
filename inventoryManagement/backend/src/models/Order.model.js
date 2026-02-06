import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quantity: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
