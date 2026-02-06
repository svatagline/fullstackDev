import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import * as controller from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", controller.getProducts);
router.post("/", protect, isAdmin, controller.createProduct);
router.put("/:id", protect, isAdmin, controller.updateProduct);
router.delete("/:id", protect, isAdmin, controller.deleteProduct);

export default router;
