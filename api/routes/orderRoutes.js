import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";

router.route("/").get(protect, admin, getOrders);

router.route("/mine").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
