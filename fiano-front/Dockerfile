FROM node:12-alpine

# Create app directory
WORKDIR /src

# Installing dependencies
COPY package*.json /src/
RUN npm install

# Copying source files
COPY . .
