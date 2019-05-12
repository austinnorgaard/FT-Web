#!/bin/bash

# Do the NPM installs up front, as we have cross-project dependencies, so
# before we get into the actual building, need everything installed
export NVM_DIR=/usr/local/nvm
export NODE_VERSION=8.16.0
source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default

node -v
npm -v

pushd .
cd /root/FT-WEB/field-trainer/field-trainer/ && SASS_BINARY_SITE=https://s3-us-west-2.amazonaws.com/sqlite3-builds/node-bass-build npm install
popd

pushd .
cd /root/FT-WEB/smart-cone-api/ && npm install --node_sqlite3_binary_host_mirror=https://s3-us-west-2.amazonaws.com/sqlite3-builds/sqlite3-builds
popd

pushd .
cd /root/FT-WEB/serve-frontend/ && JOBS=`nproc` npm install
popd

pushd .
cd /root/FT-WEB/smart-cone-api && npm run prestart:prod || exit -1
popd

pushd .
cd /root/FT-WEB/field-trainer/field-trainer && npm run build || exit -1
popd

# The frontend will have created a dist folder, just need copy the contents into the serve folder
rm -rf /root/FT-WEB/serve-frontend/dist
mv /root/FT-WEB/field-trainer/field-trainer/dist ./serve-frontend

# We can zip up the entire serve-frontend folder, ready for deployment
tar -czvf smart-cone-frontend.tar.gz /root/FT-WEB/serve-frontend/
tar -czvf smart-cone-backend.tar.gz /root/FT-WEB/serve-frontend/

rm -rf /root/FT-WEB/smart-cone-package
mv /root/FT-WEB/smart-cone-frontend.tar.gz /root/FT-WEB/smart-cone-package
mv /root/FT-WEB/smart-cone-backend.tar.gz /root/FT-WEB/smart-cone-package

tar -czvf smart-cone-package.tar.gz /root/FT-WEB/smart-cone-package
