#!/bin/bash

# For now... recopy any file which may change in the update script
# TODO: Need to split file updates away from bootstrap content...
sudo cp ~/FT-WEB/deployment/smartcone /etc/init.d/smartcone
sudo chmod +x /etc/init.d/smartcone
sudo update-rc.d smartcone defaults

# Adhoc scripts
# We take both of the adhoc scripts and drop the "field-cone" specific part of it
sudo cp ~/FT-WEB/deployment/switch_to_adhoc_smart_cone.sh /usr/bin/switch_to_adhoc.sh
sudo chmod +x /usr/bin/switch_to_adhoc.sh

sudo cp ~/FT-WEB/deployment/switch_to_regular_wifi_smart_cone.sh /usr/bin/switch_to_regular_wifi.sh
sudo chmod +x /usr/bin/switch_to_regular_wifi.sh

# This needs to be run when the cone has an internet connection, otherwise
# it will not be able to pull in new releases from GitHub
echo "Disabling Frontend and Backend services"

sudo service smartcone stop

cd ~/FT-WEB/field-trainer/field-trainer && npm install
cd ~/FT-WEB/smart-cone-api/ && env JOBS=4 npm install
cd ~/FT-WEB/serve-frontend/ && env JOBS=4 npm install

# Build the frontend and deploy it

cd ~/FT-WEB/field-trainer/field-trainer && npm run build && sudo rm -rf ~/FT-WEB/serve-frontend/dist && mv ~/FT-WEB/field-trainer/field-trainer/dist ~/FT-WEB/serve-frontend

# Build backend
cd ~/FT-WEB/smart-cone-api/ && npm run prestart:prod

# Restart the frontend & backend services
sudo service smartcone start
