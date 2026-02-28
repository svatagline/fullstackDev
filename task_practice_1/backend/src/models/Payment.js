// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        platformFee: {
            type: Number,
            default: 0
        },
        providerEarning: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ["upi", "card", "netbanking"],
            default: "upi"
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending"
        }
    },
    { timestamps: true }
);

// Important indexes for revenue queries
paymentSchema.index({ providerId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ orderId: 1 });

module.exports =
    mongoose.models.Payment || mongoose.model("Payment", paymentSchema);