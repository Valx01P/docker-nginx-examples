# --- Stage 1: Build stage ---
  FROM node:19-alpine AS builder

  # Set working directory in the container
  WORKDIR /usr/src/app
  
  # Copy package.json and package-lock.json
  COPY package*.json ./
  
  # Install dependencies
  RUN npm install
  
  # Copy the rest of the files (source code, etc.)
  COPY . .
  
  # Build or transpile your code (if applicable)
  # For example, if you’re using TypeScript or a bundler:
  # RUN npm run build
  
  # --- Stage 2: Production stage ---
  FROM node:19-alpine
  
  # Set a working directory
  WORKDIR /usr/app
  
  # Copy only the build artifacts (and maybe node_modules) from builder stage
  # If you have compiled output (like dist/), you’d do:
  # COPY --from=builder /usr/src/app/dist ./dist
  # or if it's just raw JS:
  COPY --from=builder /usr/src/app ./
  
  # If you need production-only deps, you could run:
  # RUN npm ci --only=production
  
  # Expose the port (just for documentation, not strictly required to function)
  EXPOSE 3000
  
  # Define the startup command
  CMD ["node", "server.js"]
  