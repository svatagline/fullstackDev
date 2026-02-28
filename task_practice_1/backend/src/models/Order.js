// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending"
        }
    },
    { timestamps: true }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ postId: 1 });

module.exports = mongoose.model("Order", orderSchema);