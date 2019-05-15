#!/bin/bash

# Do the NPM installs up front, as we have cross-project dependencies, so
# before we get into the actual building, need everything installed
export NVM_DIR=/usr/local/nvm
export NODE_VERSION=8.16.0
source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default
nvm use --delete-prefix v8.16.0 --silent
source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default

node -v
npm -v

apt-get update
apt-get install -y pigz parallel

pushd .
parallel sh -c ::: "cd /root/FT-WEB/smart-cone-api/ && npm install --node_sqlite3_binary_host_mirror=https://s3-us-west-2.amazonaws.com/sqlite3-builds/sqlite3-builds" "cd /root/FT-WEB/field-trainer/field-trainer/ && SASS_BINARY_SITE=https://s3-us-west-2.amazonaws.com/sqlite3-builds/node-bass-build npm install" "cd /root/FT-WEB/serve-frontend && npm install"
popd

pushd .
parallel sh -c ::: "cd /root/FT-WEB/smart-cone-api && npm run prestart:prod" "cd /root/FT-WEB/field-trainer/field-trainer && npm run build"
popd

# The frontend will have created a dist folder, just need copy the contents into the serve folder
rm -rf ./serve-frontend/dist
mv ./field-trainer/field-trainer/dist ./serve-frontend

# We can zip up the entire serve-frontend folder, ready for deployment
tar -cf smart-cone-frontend.tar.gz -I pigz ./serve-frontend/
tar -cf smart-cone-backend.tar.gz -I pigz ./smart-cone-api/
tar -cf smart-cone-fieldtrainer.tar.gz -I pigz ./field-trainer/

rm -rf ./smart-cone-package
mkdir ./smart-cone-package
mv ./smart-cone-frontend.tar.gz ./smart-cone-package
mv ./smart-cone-backend.tar.gz ./smart-cone-package
mv ./smart-cone-fieldtrainer.tar.gz ./smart-cone-package

OUTPUT_NAME="smart-cone-package-$(git rev-list --count HEAD).tar.gz"

tar -cf $OUTPUT_NAME -I pigz ./smart-cone-package

/root/.local/bin/aws s3 cp ./$OUTPUT_NAME s3://field-trainer-builds

# stop the instance to save $$$$
/root/.local/bin/aws ec2 stop-instances --instance-ids i-0ccc4ab7e15faa5d5 --region us-west-2
