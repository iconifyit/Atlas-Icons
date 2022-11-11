# Node Express Server Dockerfile

# Base image
FROM node:12.16.1-alpine

ENV jWT_PRIVATE_KEY=jwtPrivateKey

ENV DATABASE_URL=mongodb://localhost:27017/vectopus

# Set working directory
WORKDIR /var/app/server

# Install and cache app dependencies
COPY package*.json /var/app/server/

RUN npm install

# Add app
COPY . /var/app/server/

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "server.js"]

# FROM node:16

# ENV DATABASE_URL=mongodb://localhost:27017
# # mongodb://localhost/vectopus-icons
# ENV jWT_PRIVATE_KEY=jwtPrivateKey
# ENV PORT=5000
# WORKDIR /app/server
# ENV UPLOAD_DIR =../public/uploads/icons/
# ENV TEMP_DIR =../public/uploads/


# COPY ./src/server/package.json /app/server/

# COPY ./src/server/package-lock.json /app/server/

# RUN npm install

# COPY ./src/server/ /app/server/

