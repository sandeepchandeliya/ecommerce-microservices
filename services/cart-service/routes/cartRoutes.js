import express from "express";
import { getCart, addToCart, removeFromCart,updateCartQuantity } from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Protect all routes
router.use(verifyToken);

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);
router.patch("/:productId", updateCartQuantity);

export default router;
