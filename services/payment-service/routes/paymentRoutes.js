import express from "express";
import { makePayment } from "./../controllers/paymentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, makePayment);

export default router;
