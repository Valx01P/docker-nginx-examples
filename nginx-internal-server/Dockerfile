# Stage 1: Build the React app
FROM node:18.17-bullseye AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and specific rollup package
RUN npm install
RUN npm install @rollup/rollup-linux-x64-gnu

# Copy all client source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]