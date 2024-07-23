# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR C:/Development/GitHub/DockerCourse/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "server.js"]
