FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
# RUN yarn global add pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
# COPY ./package*.json ./
# COPY yarn.lock ./

# RUN rm -rf dist


# Install dependencies
# RUN yarn install


# Copy all files
COPY dist dist

# Build app
# RUN yarn build


# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
# RUN mkdir ./uploads
# RUN chown node ./uploads
USER node

# Run npm start script with PM2 when container starts
CMD [ "yarn", "start" ]