FROM node:latest

# Create directories
RUN mkdir -p /api
RUN mkdir -p /entrypoint

# Change to entrypoint location
WORKDIR /entrypoint

# Copy entrypoint file
COPY entrypoint.sh /entrypoint/entrypoint.sh

# Install Git
RUN apt-get update && apt-get install -y git

# Change to app
WORKDIR /api

# Run base configuration
CMD ["entrypoint.sh"]