mkdir -p /api

# Clone repository and copy files
git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/api/* /api

# install dependencies
cd /api
npm install 

# Clean up
rm -rf /tmp/repository

# Start the app
npm run start