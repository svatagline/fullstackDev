import {
  getAllProductsService,
  createProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await deleteProductService(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
