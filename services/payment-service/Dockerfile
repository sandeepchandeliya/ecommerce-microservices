# Dockerfile for auth-service (port 8001 example)

# 1️⃣ Use official Node.js image
FROM node:20

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4️⃣ Copy all source code
COPY . .

# 5️⃣ Expose the service port
EXPOSE 8005  

# 6️⃣ Start the service
CMD ["npm", "run", "dev"]
