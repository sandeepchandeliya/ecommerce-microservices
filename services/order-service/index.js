import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ status: "Order service running" }));

app.use("/order", orderRoutes);

const PORT = process.env.PORT || 8004;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
});
