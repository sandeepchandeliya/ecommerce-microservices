import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/cart", cartRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Cart service is running" });
});

const PORT = process.env.PORT || 8003;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Cart Service running on port ${PORT}`));
});
