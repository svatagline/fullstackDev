import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";
import { io } from "../socket/socket.js";

export const createOrder = async (userId, { productId, quantity }) => {
  const product = await Product.findById(productId);
  if (!product || product.stock < quantity)
    throw new Error("Insufficient stock");

  product.stock -= quantity;
  await product.save();

  const order = await Order.create({ userId, productId, quantity });

  // 🔥 Socket events
  io.emit("inventory:update", {
    productId,
    stock: product.stock,
  });

  io.emit("admin:new-order", {
    orderId: order._id,
    product: product.name,
    quantity,
  });

  return order;
};
