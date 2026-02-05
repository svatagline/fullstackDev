import productModel from "../models/productModel.js";

export const getAllProductsService = async () => {
  return await productModel.find();
};

export const createProductService = async (product) => {
  return await productModel.create(product);
};
export const getProductByIdService = async (id) => {
  return await productModel.findById(id);
};

export const updateProductService = async (id, product) => {
  return await productModel.findByIdAndUpdate(id, product);
};

export const deleteProductService = async (id) => {
  return await productModel.findByIdAndDelete(id);
};
