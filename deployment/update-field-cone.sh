#!/bin/bash

# Always re-copy files as this is quick and easy and lets us easily update them
sudo cp ~/FT-WEB/deployment/fieldcone /etc/init.d/fieldcone
sudo chmod +x /etc/init.d/fieldcone
sudo update-rc.d fieldcone defaults

sudo service fieldcone stop

cd ~/FT-WEB/field-cone-api && npm install

cd ~/FT-WEB/field-cone-api && npm run build

sudo service fieldcone start