# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose the port used by API Gateway
EXPOSE 8000

# Start the service
CMD ["npm", "run", "dev"]
