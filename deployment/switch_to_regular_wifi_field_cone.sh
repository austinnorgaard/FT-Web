#!/bin/sh

# We are just trying to undo the script which got us into adhoc mode

# dhcpcd.conf
# Grab the field cone adhoc dhcpcd.conf file from the deployment folder and replace the existing
sudo rm /etc/dhcpcd.conf
sudo cp /home/pi/FT-WEB/deployment/dhcpcd_field_cone_regular.conf /etc/dhcpcd.conf
sudo chmod 644 /etc/dhcpcd.conf

# rc.local
sudo rm /etc/rc.local
sudo cp /home/pi/FT-WEB/deployment/rc.local_regular_field_cone /etc/rc.local
sudo chmod 755 /etc/rc.local

echo "Settings changed, rebooting to apply changes..."
sleep 1
sudo reboot