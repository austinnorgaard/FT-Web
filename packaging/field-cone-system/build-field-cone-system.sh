#!/bin/bash

REPO_ROOT="/home/ubuntu"

rm -rf ./field-cone-system
mkdir ./field-cone-system

cp $REPO_ROOT/FT-WEB/deployment/config.txt ./field-cone-system
cp $REPO_ROOT/FT-WEB/deployment/modules ./field-cone-system
cp $REPO_ROOT/FT-WEB/deployment/i2samp.sh ./field-cone-system

cp $REPO_ROOT/FT-WEB/deployment/switch_to_adhoc_field_cone.sh ./field-cone-system
cp $REPO_ROOT/FT-WEB/deployment/switch_to_regular_wifi_field_cone.sh ./field-cone-system
cp $REPO_ROOT/FT-WEB/deployment/dhcpcd_field_cone_adhoc.conf ./field-cone-system
cp $REPO_ROOT/FT-WEB/deployment/dhcpcd_field_cone_regular.conf ./field-cone-system
cp $REPO_ROOT/FT-WEB/deployment/rc.local_regular_field_cone ./field-cone-system
cp $REPO_ROOT/FT-WEB/deployment/rc.local_adhoc_field_cone ./field-cone-system

cp $REPO_ROOT/FT-WEB/packaging/field-cone-system/install.sh ./field-cone-system

BUILD_NUM="$(git rev-list --count HEAD)"
OUTPUT_NAME="field-cone-system-$BUILD_NUM.tar.gz"

tar -cf $OUTPUT_NAME -I pigz ./field-cone-system

aws s3 cp ./$OUTPUT_NAME s3://field-trainer-builds/field-cone-system/$OUTPUT_NAME

# update the builds.json
cp $REPO_ROOT/FT-WEB/packaging/common/build_template.json ./builds.json

sed -i "s/NEWVERSION/$BUILD_NUM/g" ./builds.json
sed -i "s/NEWURI/field-cone-system\/$OUTPUT_NAME/g" ./builds.json

aws s3 cp ./builds.json s3://field-trainer-builds/field-cone-system/builds.json

# stop the instance to save $$$$
aws ec2 stop-instances --instance-ids i-0508ea3e37243a5c1 --region us-west-2