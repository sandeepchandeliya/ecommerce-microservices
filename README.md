# 🛒 E-Commerce Microservices Project

## Project Overview
This project is a **full-stack E-Commerce application** built with a **microservices architecture**. Each core functionality is implemented as a separate service to ensure scalability, maintainability, and modularity. The system supports authentication, product management, cart management, order processing, payments (Stripe), and inventory management.

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: JWT  
- **Payment**: Stripe API  
- **Microservices**: Auth, Product, Cart, Order, Payment, Inventory  
- **API Gateway**: HTTP Proxy Middleware  
- **Containerization**: Docker, Docker Compose  
- **Logging & Security**: Morgan, Helmet, CORS  

---


## Architecture

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
## Folder Structure (Example: auth-service)
```
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
> Repeat similar structure for each service (product, cart, order, payment, inventory).



- **Auth Service**: User registration/login, JWT generation  
- **Product Service**: CRUD operations for products  
- **Cart Service**: Manage cart items per user  
- **Order Service**: Checkout cart → create order  
- **Payment Service**: Stripe payment integration, updates order status  
- **Inventory Service**: Manages stock per product  

---

## ⚡ Features
- JWT-based authentication & protected routes  
- Microservices architecture with REST APIs  
- Dockerized services for easy deployment  
- Stripe payment integration with test mode  
- Inventory updates after payment  
- API Gateway for unified endpoint access  
- Full Postman collection for testing endpoints  

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x  
- Docker & Docker Compose  
- MongoDB (or use Dockerized Mongo)  
- Stripe account (test mode)  

### Clone the repository
```bash
git clone https://github.com/<your-username>/ecommerce-microservices.git
cd ecommerce-microservices

Create .env file for each service
Example for auth-service:
PORT=8001
MONGO_URI=mongodb://mongo:27017/auth-service
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=1d

Repeat for each service (product-service, cart-service, etc.), adjusting ports.


Run with Docker
docker compose up --build
All services should start and connect to MongoDB

Health check endpoints:

Auth: http://localhost:8001/health

Product: http://localhost:8002/health

Cart: http://localhost:8003/health

Order: http://localhost:8004/health

Payment: http://localhost:8005/health

Inventory: http://localhost:8006/health

API Gateway: http://localhost:8000/health

```

## 🔑 API Endpoints (via API Gateway)
Auth Service

-POST /auth/register – Register user

POST /auth/login – Login & get JWT

Product Service

GET /products – List products

POST /products – Add product (protected)

GET /products/:id – Get single product

Cart Service

GET /cart – Get user cart (protected)

POST /cart – Add to cart (protected)

PATCH /cart/:productId – Update quantity

DELETE /cart/:productId – Remove item

Order Service

POST /order/checkout – Checkout cart (protected)

GET /order – Get all orders (protected)

GET /order/:id – Get order by ID

PATCH /order/:id/status – Update order status

Payment Service

POST /payment – Make payment for order (protected)

Inventory Service

GET /inventory/:productId – Check stock

PATCH /inventory/:productId – Update stock (internal)
