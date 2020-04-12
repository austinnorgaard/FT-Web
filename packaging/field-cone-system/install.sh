#!/bin/bash

# Package: field-cone-system

echo "fieldcone" > /var/tmp/.cone-type

sudo chmod 666 /etc/wpa_supplicant/wpa_supplicant.conf

apt-get -y update
apt-get -y install batctl bridge-utils build-essential python-dev git scons swig

pushd .

git clone https://github.com/jgarff/rpi_ws281x.git
cd rpi_ws281x && scons && cd python && python setup.py install

popd

# shouldnt actually be needed, but trying to keep parity with the older bootstrap scripts
touch /var/tmp/.tilt-gpio-pin

sudo cp ./config.txt /boot/config.txt
sudo cp ./modules /etc/modules

sudo cp ./switch_to_adhoc_field_cone.sh /usr/bin/switch_to_adhoc.sh
sudo chmod +x /usr/bin/switch_to_adhoc.sh

sudo cp ./switch_to_regular_wifi_field_cone.sh /usr/bin/switch_to_regular_wifi.sh
sudo chmod +x /usr/bin/switch_to_regular_wifi.sh

sudo cp ./dhcpcd_field_cone_adhoc.conf /var/tmp/dhcpcd_field_cone_adhoc.conf
sudo cp ./dhcpcd_field_cone_regular.conf /var/tmp/dhcpcd_field_cone_regular.conf
sudo cp ./rc.local_regular_field_cone /var/tmp/rc.local_regular_field_cone
sudo cp ./rc.local_adhoc_field_cone /var/tmp/rc.local_adhoc_field_cone

sudo bash ./i2samp.sh -y

## ?? Why/who is creating this aplay.service which just runs aplay at startup
## playing audio to /dev/zero? Insanity!
## Note: This _shouldnt_ break aplay, just remove the autoplay nonsense
sudo systemctl disable aplay

sudo systemctl daemon-reload