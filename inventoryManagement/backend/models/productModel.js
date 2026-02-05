import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  stock: Number,
  price: Number,
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
