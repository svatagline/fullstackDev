const OrderModel = require("../models/order-model");

exports.createOrder = async (order) => {
    return await OrderModel.create(order);
};
exports.getOrderById = async (id) => {
    return await OrderModel.find({ userId: id });
};


