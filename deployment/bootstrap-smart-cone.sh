#!/bin/bash

# This script handles all deployment details for a Smart Cone

if [ -f ./bootstrap.sh ]
then
    echo "This script must be run from the deployment folder!!"
    exit 1
fi

sudo cp ./smartcone /etc/init.d/smartcone
sudo chmod +x /etc/init.d/smartcone
sudo update-rc.d smartcone defaults

echo "smartcone" > /var/tmp/.cone-type

# Install wifi
echo "Installing WiFi driver for attached wifi card. NOTE: If you do not have a WiFi card attached, this will not work and the script will need to be rerun"

sudo wget http://www.fars-robotics.net/install-wifi -O /usr/bin/install-wifi
sudo chmod +x /usr/bin/install-wifi

sudo install-wifi

echo "Configuring Access Point software"
sudo apt-get -y update
sudo apt-get -y install dnsmasq hostapd

# Hostapd/Dnsmasq related stuff
sudo mv ~/FT-WEB/deployment/dnsmasq.conf /etc/dnsmasq.conf
sudo chmod 644 /etc/dnsmasq.conf

sudo mv ~/FT-WEB/deployment/hostapd.conf /etc/hostapd/hostapd.conf
sudo chmod 644 /etc/hostapd/hostapd.conf

sudo mv ~/FT-WEB/deployment/hostapd /etc/init.d/hostapd
sudo chmod 755 /etc/init.d/hostapd


sudo systemctl daemon-reload

sudo reboot