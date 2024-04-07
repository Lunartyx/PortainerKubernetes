mkdir -p /app

# Clone repository and copy files
git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/frontend/* /app

# install dependencies
cd /app
npm install 

# Clean up
rm -rf /tmp/repository

# Start the app
npm run start