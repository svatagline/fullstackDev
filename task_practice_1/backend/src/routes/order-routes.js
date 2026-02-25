const express = require("express");
const {
    createOrder,
    getOrderById,

} = require("../controllers/order-controller");

const router = express.Router();

router.route("/").post(createOrder);
router.route("/:id").get(getOrderById);

module.exports = router;
