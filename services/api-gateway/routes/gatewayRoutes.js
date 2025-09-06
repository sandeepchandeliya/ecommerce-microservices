import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(express.json());

// --- Auth Service Routes ---
router.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:8001", // auth-service
    changeOrigin: true,
    pathRewrite: { "^/auth": "/api/auth" }
  })
);

// --- Product Service Routes (protected) ---
router.use(
  "/products",
  verifyToken, // require JWT
  createProxyMiddleware({
    target: "http://localhost:8002", // product-service
    changeOrigin: true,
    pathRewrite: { "^/products": "/api/products" }
  })
);

// --- Cart Service Routes (protected) ---
router.use(
  "/cart",
  verifyToken,
  createProxyMiddleware({
    target: "http://localhost:8003",
    changeOrigin: true,
    pathRewrite: { "^/cart": "/cart" },
    onProxyReq: (proxyReq, req) => {
      if (req.body && ["POST", "PUT", "PATCH"].includes(req.method)) {
        const bodyData = JSON.stringify(req.body);

        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

        // Write body and immediately end the request
        proxyReq.write(bodyData);
        proxyReq.end();
      }

      // Forward Authorization header for JWT
      if (req.headers.authorization) {
        proxyReq.setHeader("Authorization", req.headers.authorization);
      }
    }
  })
);



// --- Order Service ---
router.use(
  "/order",
  verifyToken,
  createProxyMiddleware({
    target: "http://localhost:8004",
    changeOrigin: true,
    pathRewrite: { "^/order": "/order" },
    onProxyReq: (proxyReq, req) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
  })
);


export default router;
