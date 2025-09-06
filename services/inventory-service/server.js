import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import inventoryRoutes from "./routes/inventoryRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/inventory", inventoryRoutes);

app.get("/health", (req, res) => res.send("Inventory Service is running"));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Inventory Service running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB connection failed:", err));
