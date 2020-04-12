#!/bin/bash

# Package: smart-cone-system

echo "smartcone" > /var/tmp/.cone-type

sudo chmod 666 /etc/wpa_supplicant/wpa_supplicant.conf

apt-get -y update
apt-get -y install batctl bridge-utils build-essential python-dev git scons swig

# LED Stuff
pushd .

git clone https://github.com/jgarff/rpi_ws281x.git
cd rpi_ws281x && scons && cd python && python setup.py install

popd

touch /var/tmp/.tilt-gpio-pin

sudo mv ./install-wifi /usr/bin/install-wifi
sudo chmod +x /usr/bin/install-wifi

sudo install-wifi

sudo cp ./dnsmasq.conf /var/tmp/dnsmasq.conf
sudo mv ./dnsmasq.conf /etc/dnsmasq.conf
sudo chmod 644 /etc/dnsmasq.conf

sudo mv ./hostapd.conf /etc/hostapd/hostapd.conf
sudo chmod 644 /etc/hostapd/hostapd.conf

sudo mv ./hostapd /etc/init.d/hostapd
sudo chmod 755 /etc/init.d/hostapd

sudo mv ./hostapd.service /lib/systemd/system/hostapd.service

sudo cp ./dhcpcd.conf /var/tmp/dhcpcd.conf
sudo mv ./dhcpcd.conf /etc/dhcpcd.conf
sudo chmod 664 /etc/dhcpcd.conf

sudo mv ./switch_to_adhoc_smart_cone.sh /usr/bin/switch_to_adhoc.sh
sudo chmod +x /usr/bin/switch_to_adhoc.sh

sudo mv ./switch_to_regular_wifi_smart_cone.sh /usr/bin/switch_to_regular_wifi.sh
sudo chmod +x /usr/bin/switch_to_regular_wifi.sh

sudo mv ./dhcpcd_smart_cone_adhoc.conf /var/tmp/dhcpcd_smart_cone_adhoc.conf

sudo mv ./rc.local_adhoc_smart_cone /var/tmp/rc.local_adhoc_smart_cone

sudo mv ./rc.local_regular_smart_cone /var/tmp/rc.local_regular_smart_cone

sudo mv ./dnsmasq_adhoc.conf /var/tmp/dnsmasq_adhoc.conf

sudo mv ./config.txt /boot/config.txt
sudo mv ./modules /etc/modules

echo "Installing audio"
sudo bash ./i2samp.sh -y

## ?? Why/who is creating this aplay.service which just runs aplay at startup
## playing audio to /dev/zero? Insanity!
## Note: This _shouldnt_ break aplay, just remove the autoplay nonsense
sudo systemctl disable aplay

sudo systemctl daemon-reload
sudo systemctl enable hostapd
sudo systemctl restart hostapd