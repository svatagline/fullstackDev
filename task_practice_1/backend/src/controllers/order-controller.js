const orderService = require("../services/order-services");



exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
