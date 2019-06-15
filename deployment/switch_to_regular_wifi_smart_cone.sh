#!/bin/sh

# swap out the dhcp file
sudo rm /etc/dhcpcd.conf
sudo cp /var/tmp/dhcpcd.conf /etc/dhcpcd.conf
sudo chmod 644 /etc/dhcpcd.conf

sudo rm /etc/rc.local
sudo cp /var/tmp/rc.local_regular_smart_cone /etc/rc.local
sudo chmod 755 /etc/rc.local

sudo rm /etc/dnsmasq.conf
sudo cp /var/tmp/dnsmasq.conf /etc/dnsmasq.conf
sudo chmod 644 /etc/dhcpcd.conf

echo "Settings changed, rebooting to apply changes..."
sleep 1
sudo reboot