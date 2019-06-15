#!/bin/bash

# Installs all of the system-configuration files and settings specific for the smart-cone
# Includes things like drivers, scripts, settings, etc

# Just move all of the necessary files into a folder, include the install script, package and upload

REPO_ROOT="/home/ubuntu"

rm -rf ./smart-cone-system
mkdir ./smart-cone-system

cp $REPO_ROOT/FT-WEB/deployment/dnsmasq.conf ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/hostapd.conf ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/hostapd ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/dhcpcd.conf ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/dhcpcd_smart_cone_adhoc.conf ./smart-cone-system

cp $REPO_ROOT/FT-WEB/deployment/i2samp.sh ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/switch_to_adhoc_smart_cone.sh ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/switch_to_regular_wifi_smart_cone.sh ./smart-cone-system

cp $REPO_ROOT/FT-WEB/deployment/rc.local_regular_smart_cone ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/rc.local_adhoc_smart_cone ./smart-cone-system

cp $REPO_ROOT/FT-WEB/deployment/dnsmasq_adhoc.conf ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/config.txt ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/modules ./smart-cone-system
cp $REPO_ROOT/FT-WEB/deployment/install-wifi ./smart-cone-system

cp $REPO_ROOT/FT-WEB/packaging/smart-cone-system/install.sh ./smart-cone-system

BUILD_NUM="$(git rev-list --count HEAD)"
OUTPUT_NAME="smart-cone-system-$BUILD_NUM.tar.gz"

tar -cf $OUTPUT_NAME -I pigz ./smart-cone-system

aws s3 cp ./$OUTPUT_NAME s3://field-trainer-builds/smart-cone-system/$OUTPUT_NAME

# update the builds.json
cp $REPO_ROOT/FT-WEB/packaging/common/build_template.json ./builds.json

sed -i "s/NEWVERSION/$BUILD_NUM/g" ./builds.json
sed -i "s/NEWURI/smart-cone-system\/$OUTPUT_NAME/g" ./builds.json

aws s3 cp ./builds.json s3://field-trainer-builds/smart-cone-system/builds.json

# stop the instance to save $$$$
aws ec2 stop-instances --instance-ids i-0508ea3e37243a5c1 --region us-west-2