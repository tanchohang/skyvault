FROM node:alpine

# Set working directory
WORKDIR /usr/app


# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./
# COPY yarn.lock ./

# RUN rm -rf dist


# Install dependencies
RUN yarn install


# Copy all files
COPY . .

USER node

# Run npm start script with PM2 when container starts
CMD [ "yarn", "start" ]