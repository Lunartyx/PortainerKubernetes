FROM node:latest

# Create directories
RUN mkdir -p /api
RUN mkdir -p /entrypoint

# Change to entrypoint location
WORKDIR /entrypoint

# Install Git
RUN apt-get update && apt-get install -y git

# Download data from repository
RUN git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/frontend/* /api

# Delete temporary Repository
RUN rm -rf /tmp/repository

# Change Workdirectory to api
WORKDIR /api

# Install dependencies
RUN npm install

# Run service
CMD [ "npm", "run", "start" ]