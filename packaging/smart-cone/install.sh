#!/bin/bash

# Package: smart-cone

sudo killall node

# This script assumes its run in the same directory as the frontend
# and backend archives

tar xf smart-cone-backend.tar.gz

# Creates a folder called "smart-cone-api"
# Install to /opt/smart-cone-backend
sudo rm -rf /opt/smart-cone-api
sudo mv ./smart-cone-api /opt/

tar xf smart-cone-frontend.tar.gz

# Creates a folder called 'serve-frontend'
# install to /opt/smart
sudo rm -rf /opt/serve-frontend
sudo mv ./serve-frontend /opt/

# Install the startup script
sudo mv ./smartcone /etc/init.d/smartcone
sudo chmod +x /etc/init.d/smartcone
sudo update-rc.d smartcone defaults

sudo service smartcone start