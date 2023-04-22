# Use an official Node.js runtime as a parent image
FROM node:16-alpine3.11

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the app for production with Vite
RUN npm run build

# Set the command to start the production server
CMD ["npm", "run", "serve"]
