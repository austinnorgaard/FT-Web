#!/bin/bash

export NVM_DIR=/usr/local/nvm
export NODE_VERSION=8.16.0
source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default
nvm use --delete-prefix v8.16.0 --silent
source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default

node -v
npm -v

apt-get update
apt-get install -y pigz

pushd .
cd /root/FT-WEB/field-cone-api/ && npm install && npm run build
popd

tar -cf field-cone.tar.gz -I pigz ./field-cone-api/

rm -rf ./field-cone
mkdir ./field-cone
mv ./field-cone.tar.gz ./field-cone
mv /root/FT-WEB/packaging/field-cone/install.sh ./field-cone
mv /root/FT-WEB/packaging/field-cone/fieldcone ./field-cone

BUILD_NUM="$(git rev-list --count HEAD)"
OUTPUT_NAME="field-cone-$BUILD_NUM.tar.gz"

tar -cf $OUTPUT_NAME -I pigz ./field-cone

if [ $1 == "prod" ]; then
	/root/.local/bin/aws s3 cp ./$OUTPUT_NAME s3://field-trainer-builds/field-cone/$OUTPUT_NAME
else
	scp ./$OUTPUT_NAME kdfreude@192.168.1.9:/home/kdfreude
fi

cp /root/FT-WEB/packaging/common/build_template.json ./builds.json

sed -i "s/NEWVERSION/$BUILD_NUM/g" ./builds.json
sed -i "s/NEWURI/field-cone\/$OUTPUT_NAME/g" ./builds.json

if [ $1 == "prod" ]; then
	/root/.local/bin/aws s3 cp ./builds.json s3://field-trainer-builds/field-cone/builds.json
	/root/.local/bin/aws ec2 stop-instances --instance-ids i-017002d360a9cffa8 --region us-west-2
else
	scp ./builds.json kdfreude@192.168.1.9:/home/kdfreude
fi
