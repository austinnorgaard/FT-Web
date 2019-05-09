#!/bin/bash

# Always re-copy files as this is quick and easy and lets us easily update them
sudo cp ~/FT-WEB/deployment/fieldcone /etc/init.d/fieldcone
sudo chmod +x /etc/init.d/fieldcone
sudo update-rc.d fieldcone defaults

# Audio files
# Delete any existing ones..
sudo rm -rf /var/tmp/ft-audio-files/
sudo mkdir /var/tmp/ft-audio-files
sudo chmod 777 /var/tmp/ft-audio-files
cp ~/FT-WEB/deployment/audio-files/* /var/tmp/ft-audio-files

touch /var/tmp/.tilt-gpio-pin

# i2c
## /boot/config.txt
sudo cp ~/FT-WEB/deployment/config.txt /boot/config.txt
## /etc/modules
sudo cp ~/FT-WEB/deployment/modules /etc/modules

echo "Installing audio"
bash ~/FT-WEB/deployment/i2samp.sh -y

# Adhoc scripts
# We take both of the adhoc scripts and drop the "field-cone" specific part of it
sudo cp ~/FT-WEB/deployment/switch_to_adhoc_field_cone.sh /usr/bin/switch_to_adhoc.sh
sudo chmod +x /usr/bin/switch_to_adhoc.sh

sudo cp ~/FT-WEB/deployment/switch_to_regular_wifi_field_cone.sh /usr/bin/switch_to_regular_wifi.sh
sudo chmod +x /usr/bin/switch_to_regular_wifi.sh

sudo service fieldcone stop

cd ~/FT-WEB/field-cone-api && npm install

cd ~/FT-WEB/field-cone-api && npm run build

sudo service fieldcone start