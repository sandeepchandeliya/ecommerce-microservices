import express from "express";
import { checkout, getOrders,getOrderById ,updateOrderStatus} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.post("/checkout", checkout);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

export default router;
