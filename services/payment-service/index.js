import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/payment", paymentRoutes);

app.get("/health", (req, res) => res.json({ status: "Payment Service running" }));

const PORT = process.env.PORT || 8005;

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`))
);
