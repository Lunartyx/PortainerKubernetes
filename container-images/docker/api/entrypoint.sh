# Clone repository and copy files
git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/frontend/* /api

# Clean up
rm -rf /tmp/repository