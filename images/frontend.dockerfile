# Use a PHP base image
FROM php:latest

# Install Git
RUN apt-get update && \
    apt-get install -y git

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://somelink.com/RepositoryXY /app

# Run index.php
CMD ["php", "index.php"]
