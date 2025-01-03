# Stage 1: Build the React App
FROM node:18.17-bullseye AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build React app
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx (Unprivileged)
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

# Remove default assets
RUN rm -rf /usr/share/nginx/html/*

# Copy React build output
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (non-root)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
