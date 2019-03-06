#!/bin/bash

# This script handles all deployment details for a Field Cone

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

echo "Installing audio"
bash ~/FT-WEB/deployment/i2samp.sh -y

sudo apt-get install -y i2c-tools

echo "Rebooting!"

sudo reboot