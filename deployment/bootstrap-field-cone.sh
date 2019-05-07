#!/bin/bash

# This script handles all deployment details for a Field Cone

echo "Installing NodeJS"
wget https://nodejs.org/dist/v8.16.0/node-v8.16.0-linux-armv6l.tar.gz
tar xf node-v8.16.0-linux-armv6l.tar.gz
cd node-v8.16.0-linux-armv6l/ && sudo cp -R * /usr/local/
echo "NodeJS version: "
node -v

# install the init.d script
sudo cp ./fieldcone /etc/init.d/fieldcone
sudo chmod +x /etc/init.d/fieldcone
update-rc.d fieldcone defaults

# Write the conetype file to /var/tmp
echo "fieldcone" > /var/tmp/.cone-type

# Write the cone-id out
echo "Setting cone ID to $1"
echo $1 > /var/tmp/.cone-id

echo "Cone settings written"
sudo systemctl daemon-reload

sudo apt-get install -y i2c-tools

echo "Rebooting!"

sudo reboot