# Stage 1: Build the Vue.js application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with a simple Node server
FROM node:20
WORKDIR /app
COPY --from=build /app/dist ./dist

# Install a simple HTTP server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]