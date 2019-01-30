#!/bin/sh

# swap out the dhcp file
sudo rm /etc/dhcpcd.conf
sudo cp /home/pi/FT-WEB/deployment/dhcpcd_smart_cone_adhoc.conf /etc/dhcpcd.conf
sudo chmod 644 /etc/dhcpcd.conf

sudo rm /etc/rc.local
sudo cp /home/pi/FT-WEB/deployment/rc.local_adhoc_smart_cone /etc/rc.local
sudo chmod 755 /etc/rc.local

sudo rm /etc/dnsmasq.conf
sudo cp /home/pi/FT-WEB/deployment/dnsmasq_adhoc.conf /etc/dnsmasq.conf

echo "Settings changed, rebooting to apply changes..."
sleep 1
sudo reboot