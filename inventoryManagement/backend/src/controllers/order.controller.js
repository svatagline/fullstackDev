import * as service from "../services/order.service.js";

export const createOrder = async (req, res) => {
  const order = await service.createOrder(req, res);
  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  res.json(await service.getAll(req, res));
};
