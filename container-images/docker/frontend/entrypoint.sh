# Clone repository and copy files
git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/frontend/* /app

# Clean up
rm -rf /tmp/repository

# Install dependencies
npm install

# Start the app
npm run start
