import * as service from "../services/product.service.js";

export const getProducts = async (req, res) => {
  res.json(await service.getAll());
};

export const createProduct = async (req, res) => {
  res.status(201).json(await service.create(req.body));
};

export const updateProduct = async (req, res) => {
  res.json(await service.update(req.params.id, req.body));
};

export const deleteProduct = async (req, res) => {
  await service.remove(req.params.id);
  res.status(204).end();
};
