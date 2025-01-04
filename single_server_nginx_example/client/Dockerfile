# syntax=docker/dockerfile:1.5

# use this image as base for build stage, this lets you use the image in
# the next stage without having to copy the files over
FROM node:19.4-bullseye AS build

# Specify working directory other than /
WORKDIR /usr/src/app

# Copy only files required to install
# dependencies (better layer caching)
COPY package*.json ./

# Use cache mount to speed up install of existing dependencies
RUN npm install

COPY . .

RUN npm run build

# Use separate stage for deployable image, this version of nginx is unprivileged
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

# Use COPY --link to avoid breaking cache if we change the second stage base image,
# this will copy the file from the build stage to the deployable image
COPY --link nginx.conf /etc/nginx/conf.d/default.conf

# Copy files from build stage to deployable image
COPY --link --from=build usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 8080