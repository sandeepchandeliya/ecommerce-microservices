import express from "express";
import { getStock, addProduct, decreaseStock, increaseStock } from "../controllers/inventoryController.js";

const router = express.Router();

// Public for now, can add verifyToken if needed
router.get("/:productId", getStock);
router.post("/", addProduct);
router.patch("/:productId/decrease", decreaseStock);
router.patch("/:productId/increase", increaseStock);

export default router;
