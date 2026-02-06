import * as service from "../services/order.service.js";

export const createOrder = async (req, res) => {
  const order = await service.createOrder(req.user.id, req.body);
  res.status(201).json(order);
};
