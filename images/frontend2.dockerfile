# Use a PHP base image
FROM php:latest

# Install Git
RUN apt-get update && \
    apt-get install -y git

# Clone the repository
RUN git clone https://somelink.com/RepositoryXY /app

# Set the working directory
WORKDIR /app/web/frontend/

CMD ["php", "site1.html"]

