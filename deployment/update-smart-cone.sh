#!/bin/bash

# This needs to be run when the cone has an internet connection, otherwise
# it will not be able to pull in new releases from GitHub

cd ~/FT-WEB && git checkout master && git pull

# We have the latest now, rebuild the front-end and backend
cd ~/FT-WEB/field-trainer/field-trainer && npm install
cd ~/FT-WEB/smart-cone-api/ && env JOBS=4 npm install
cd ~/FT-WEB/serve-frontend/ && env JOBS=4 npm install

# Build the frontend and deploy it

cd ~/FT-WEB/field-trainer/field-trainer && npm run build && mv ./dist ../../serve-frontend

# Build backend
cd ~/FT-WEB/smart-cone-api/ && npm run prestart:prod

# Restart the frontend & backend services
sudo /etc/init.d/smartcone stop
sudo /etc/init.d/smartcone start
