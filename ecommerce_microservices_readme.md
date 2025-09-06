# E-Commerce Microservices Project

## Project Overview
This project is a **full-stack E-Commerce application** built with a **microservices architecture**. Each core functionality is implemented as a separate service to ensure scalability, maintainability, and modularity. The system supports authentication, product management, cart management, order processing, payments (Stripe), and inventory management.

**Tech Stack:**
- Node.js (ES6+ syntax)
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payments
- Axios for service-to-service communication
- API Gateway using `http-proxy-middleware`
- Docker (optional for containerization)


## Architecture Diagram
```
Frontend
   |
   v
API Gateway (localhost:8000)
   |--- Auth Service (8001)
   |--- Product Service (8002)
   |--- Cart Service (8003)
   |--- Order Service (8004)
   |--- Payment Service (8005)
   |--- Inventory Service (8006)
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

## Installation & Running Services
1. Clone the repository:
```bash
git clone <your-repo-url>
```
2. Navigate to each service and install dependencies:
```bash
cd services/auth-service
npm install
npm run dev
```
3. Repeat for all other services (product, cart, order, payment, inventory).

4. Add `.env` file in each service with appropriate keys:
```env
PORT=8001
MONGO_URI=mongodb://localhost:27017/auth-service
JWT_SECRET=your_jwt_secret
```
> Update ports and other keys for each service.

## API Endpoints
All endpoints are accessible via **API Gateway (`{{apiGateway}}`)**.

### Auth Service
| Method | Endpoint | Body | Response |
|--------|----------|------|---------|
| POST | /auth/register | {name, email, password} | User object + JWT |
| POST | /auth/login | {email, password} | JWT token |

### Product Service
| Method | Endpoint | Body | Response |
|--------|----------|------|---------|
| GET | /products | - | List of products |
| POST | /products | {name, price, stock} | Product object |
| GET | /products/:id | - | Single product |
| PATCH | /products/:id | {field updates} | Updated product |

### Cart Service
| Method | Endpoint | Body | Response |
|--------|----------|------|---------|
| GET | /cart | - | User cart |
| POST | /cart | {productId, quantity} | Updated cart |
| DELETE | /cart/:productId | - | Updated cart |

### Order Service
| Method | Endpoint | Body | Response |
|--------|----------|------|---------|
| POST | /order/checkout | {} | Created order |
| GET | /order | - | List of orders for user |
| GET | /order/:id | - | Single order |
| PATCH | /order/:id/status | {status} | Updated order status |

### Payment Service
| Method | Endpoint | Body | Response |
|--------|----------|------|---------|
| POST | /payment | {orderId, token} | Payment result & status |

### Inventory Service
| Method | Endpoint | Body | Response |
|--------|----------|------|---------|
| GET | /inventory/:productId | - | Product stock |
| PATCH | /inventory/:productId | {stock} | Updated stock |


## Usage Flow
1. **Register/Login** → receive JWT token.
2. **Add products** (if admin) or fetch product list.
3. **Add to cart** → manage quantities.
4. **Checkout** → creates order.
5. **Make Payment** → Stripe integration, updates order & inventory.
6. **Fetch Orders/Inventory** → monitor status & stock.

## Notes / Best Practices
- Use **JWT** for all protected routes.
- Payments use **Stripe Test Mode**.
- Orders cannot be paid twice; inventory adjusts automatically.
- API Gateway centralizes requests and protects services.
- Microservices can run independently, perfect for scaling.

## Optional: Docker Setup
- Each service has its **Dockerfile**.
- Use **docker-compose.yml** to run all services together.
- Environment variables handled via `.env` files.

## License
MIT

