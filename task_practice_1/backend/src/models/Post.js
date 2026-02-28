// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

postSchema.index({ userId: 1 });
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);