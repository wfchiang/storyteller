# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./storyteller/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./storyteller .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]  # Assuming your server entry point is server/index.js
