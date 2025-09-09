# 🛒 E-Commerce Microservices Project

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![Docker](https://img.shields.io/badge/Container-Docker-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-yellow)

> 🚀 A **production-ready E-Commerce application** built with a **Microservices Architecture**.  
Each service is independent, containerized with Docker, and communicates through an API Gateway.  

---

## 📌 Project Overview
This project demonstrates how to build a **scalable, modular, and maintainable** full-stack E-Commerce system.  

**Core Features:**
- 🔑 Authentication (JWT based)
- 📦 Product management (CRUD)
- 🛒 Cart management
- 📑 Order creation & tracking
- 💳 Payment integration (Stripe)
- 📊 Inventory stock management

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  
- **Payment:** Stripe API  
- **Microservices:** Auth, Product, Cart, Order, Payment, Inventory  
- **API Gateway:** Express Middleware  
- **Containerization:** Docker, Docker Compose  
- **Logging & Security:** Morgan, Helmet, CORS  

---

## 🏗 Architecture

```text
                +----------------+
                |  API Gateway   |
                +-------+--------+
                        |
       -------------------------------------
       |                 |                 |
   +---+---+         +---+---+         +---+---+
   | Auth  |         | Product|        | Cart  |
   |Service|         |Service |        |Service|
   +---+---+         +---+---+         +---+---+
       |                 |                 |
       +-----------------+-----------------+
                        |
                  +-----+------+
                  |   Order    |
                  |  Service   |
                  +-----+------+
                        |
                        v
                  +-----+------+
                  |  Payment   |
                  |  Service   |
                  +-----+------+
                        |
                        v
                  +-----+------+
                  | Inventory  |
                  |  Service   |
                  +------------+


```

---

## 📂 Folder Structure (Example: Auth Service)

```bash
auth-service/
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── middlewares/
│   └── verifyToken.js
├── config/
│   └── db.js
├── .env
├── package.json
└── index.js
```

<details>
<summary>📦 Other Services (Click to expand)</summary>

- **Product Service:** CRUD for products  
- **Cart Service:** Manage cart items per user  
- **Order Service:** Checkout & order creation  
- **Payment Service:** Stripe integration  
- **Inventory Service:** Stock management  
</details>

---

## ⚡ Setup & Run Locally

### 1️⃣ Clone the repo
```bash
git clone https://github.com/sandeepchandeliya/ecommerce-microservices.git
cd ecommerce-microservices
```

### 2️⃣ Create `.env` for each service  
Example for **Auth Service**:
```env
PORT=8001
MONGO_URI=mongodb://mongo:27017/auth-service
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

*(Repeat for other services: product, cart, order, payment, inventory)*  

### 3️⃣ Run with Docker
```bash
docker compose up --build
```

✅ All services will start and connect to MongoDB.  

---

## 🩺 Health Check Endpoints
- **Auth:** [http://localhost:8001/health](http://localhost:8001/health)  
- **Product:** [http://localhost:8002/health](http://localhost:8002/health)  
- **Cart:** [http://localhost:8003/health](http://localhost:8003/health)  
- **Order:** [http://localhost:8004/health](http://localhost:8004/health)  
- **Payment:** [http://localhost:8005/health](http://localhost:8005/health)  
- **Inventory:** [http://localhost:8006/health](http://localhost:8006/health)  
- **API Gateway:** [http://localhost:8000/health](http://localhost:8000/health)  

---

## 🎯 Example API Usage

### Register User
```bash
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john", "email":"john@mail.com", "password":"123456"}'
```

### Add Product
```bash
curl -X POST http://localhost:8002/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop", "price":999, "stock":10}'
```



## 📜 License
This project is under the **MIT License**.
