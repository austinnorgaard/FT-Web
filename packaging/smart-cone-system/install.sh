#!/bin/bash

# Package: smart-cone-system

tar xf smart-cone-system.tar.gz

echo "smartcone" > /var/tmp/.cone-type

sudo mv ./build-smart-cone ./smart-cone-system/install-wifi /usr/bin/install-wifi
sudo chmod +x /usr/bin/install-wifi

sudo install-wifi

sudo apt-get -y update
sudo apt-get -y install dnsmasq hostapd

sudo cp ./build-smart-cone/dnsmasq.conf /var/tmp/dnsmasq.conf
sudo mv ./build-smart-cone/dnsmasq.conf /etc/dnsmasq.conf
sudo chmod 644 /etc/dnsmasq.conf

sudo mv ./build-smart-cone/hostapd.conf /etc/hostapd/hostapd.conf
sudo chmod 644 /etc/hostapd/hostapd.conf

sudo mv ./build-smart-cone/hostapd /etc/init.d/hostapd
sudo chmod 755 /etc/init.d/hostapd

sudo cp ./build-smart-cone/dhcpcd.conf /var/tmp/dhcpcd.conf
sudo mv ./build-smart-cone/dhcpcd.conf /etc/dhcpcd.conf
sudo chmod 664 /etc/dhcpcd.conf

sudo mv ./build-smart-cone/switch_to_adhoc_smart_cone.sh /usr/bin/switch_to_adhoc.sh
sudo chmod +x /usr/bin/switch_to_adhoc.sh

sudo mv ./build-smart-cone/switch_to_regular_wifi_smart_cone.sh /usr/bin/switch_to_regular_wifi.sh
sudo chmod +x /usr/bin/switch_to_regular_wifi.sh

sudo mv ./build-smart-cone/dhcpcd_smart_cone_adhoc.conf /var/tmp/dhcpcd_smart_cone_adhoc.conf

sudo mv ./build-smart-cone/rc.local_adhoc_smart_cone /var/tmp/rc.local_adhoc_smart_cone

sudo mv ./build-smart-cone/rc.local_regular_smart_cone /var/tmp/rc.local_regular_smart_cone

sudo mv ./build-smart-cone/dnsmasq_adhoc.conf /var/tmp/dnsmasq_adhoc.conf

sudo mv ./build-smart-cone/config.txt /boot/config.txt
sudo mv ./build-smart-cone/modules /etc/modules

echo "Installing audio"
sudo bash ./build-smart-cone/i2samp.sh -y

sudo systemctl daemon-reload

sudo systemctl restart hostapd