FROM nginx:latest

# Install Git
RUN apt-get update && apt-get install -y git

# Create directories
RUN mkdir -p /usr/share/nginx/html

# Clone repository and copy files
RUN git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/test_frontend2/* /usr/share/nginx/html

# Clean up
RUN rm -rf /tmp/repository

# Expose port
EXPOSE 80
