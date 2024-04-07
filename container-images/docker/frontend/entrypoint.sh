#!/bin/bash
git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/frontend/* /app

rm -rf /tmp/repository

cd /app

npm install

npm run start
