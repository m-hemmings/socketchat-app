# Use a base image with Node.js pre-installed
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json /app/

# Install dependencies
RUN npm install

# Copy the remaining frontend files
COPY . /app

# Expose the desired port
EXPOSE 80

# Start the frontend application
CMD ["npm", "start"]
