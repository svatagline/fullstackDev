import Product from "../models/Product.model.js";

export const getAll = async () => {
  return Product.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  return Product.create(data);
};

export const update = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!product) throw new Error("Product not found");
  return product;
};

export const remove = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
};
