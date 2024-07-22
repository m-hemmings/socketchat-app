# Use a base image with Node.js pre-installed
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json /app/

# Install dependencies
RUN npm install

# Copy the remaining backend files
COPY . /app

# Expose the desired port
EXPOSE 8001

# Start the backend server
CMD ["node", "server.js"]
