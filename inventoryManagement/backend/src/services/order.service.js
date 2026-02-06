import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";
import { io } from "../socket/socket.js";

export const createOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  const userId = req.user.id;
  console.log("---------->", { userId });
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (quantity > product.stock)
    return res.status(400).json({ message: "Quantity exceeds stock" });

  product.stock -= quantity;
  await product.save();

  const order = await Order.create({
    product: productId,
    userId: userId,
    quantity,
  });

  // Emit stock update to all clients
  io.emit("inventory:update", {
    productId,
    stock: product.stock,
    lastOrderQuantity: quantity,
    user: userId,
  });
  // Emit new order for admin
  io.to("admins").emit("admin:new-order", order);

  // Emit new order for the specific user
  io.to(userId).emit("order:created", order);

  res.json(order);
};

export const getAll = async (req) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  if (userRole === "user") {
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    console.log("----------------------->", { orders, userId });
    return orders;
  }
  return Order.find().sort({ createdAt: -1 });
};
