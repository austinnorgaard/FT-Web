#!/bin/sh

# swap out the dhcp file
sudo rm /etc/dhcpcd.conf
sudo cp /var/tmp/dhcpcd_smart_cone_adhoc.conf /etc/dhcpcd.conf
sudo chmod 644 /etc/dhcpcd.conf

sudo rm /etc/rc.local
sudo cp /var/tmp/rc.local_adhoc_smart_cone /etc/rc.local
sudo chmod 755 /etc/rc.local

sudo rm /etc/dnsmasq.conf
sudo cp /var/tmp/dnsmasq_adhoc.conf /etc/dnsmasq.conf

echo "Settings changed, rebooting to apply changes..."
sleep 1
sudo reboot