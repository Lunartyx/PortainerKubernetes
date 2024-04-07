#!/bin/bash

git clone https://github.com/Lunartyx/PortainerKubernetes.git /tmp/repository && \
    cp -r /tmp/repository/web/frontend/* /api

rm -rf /tmp/repository

cd /api

npm install

npm run start