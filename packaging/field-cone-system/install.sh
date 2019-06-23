#!/bin/bash

# Package: field-cone-system

echo "fieldcone" > /var/tmp/.cone-type

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

sudo systemctl daemon-reload