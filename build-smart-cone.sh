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

apt-get install -y pigz

pushd .
cd ./field-trainer/field-trainer/ && SASS_BINARY_SITE=https://s3-us-west-2.amazonaws.com/sqlite3-builds/node-bass-build npm install
popd

pushd .
cd ./smart-cone-api/ && npm install --node_sqlite3_binary_host_mirror=https://s3-us-west-2.amazonaws.com/sqlite3-builds/sqlite3-builds
popd

pushd .
cd ./serve-frontend/ && npm install
popd

pushd .
cd ./smart-cone-api && npm run prestart:prod || exit -1
popd

pushd .
cd ./field-trainer/field-trainer && npm run build || exit -1
popd

# The frontend will have created a dist folder, just need copy the contents into the serve folder
rm -rf ./serve-frontend/dist
mv ./field-trainer/field-trainer/dist ./serve-frontend

# We can zip up the entire serve-frontend folder, ready for deployment
tar -czf smart-cone-frontend.tar.gz -I pigz ./serve-frontend/
tar -czf smart-cone-backend.tar.gz -I pigz ./smart-cone-api/
tar -czf smart-cone-fieldtrainer.tar.gz -I pigz ./field-trainer/

rm -rf ./smart-cone-package
mkdir ./smart-cone-package
mv ./smart-cone-frontend.tar.gz ./smart-cone-package
mv ./smart-cone-backend.tar.gz ./smart-cone-package
mv ./smart-cone-fieldtrainer.tar.gz ./smart-cone-package

tar -czf smart-cone-package.tar.gz -I pigz ./smart-cone-package
