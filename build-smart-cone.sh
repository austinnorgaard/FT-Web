#!/bin/sh

# Do the NPM installs up front, as we have cross-project dependencies, so
# before we get into the actual building, need everything installed

node -v
npm -v

pushd .
cd ./field-trainer/field-trainer/ && JOBS=`nproc` npm install
popd

pushd .
cd ./smart-cone-api/ && JOBS=`nproc` npm install
popd

pushd .
cd ./serve-frontend/ && JOBS=`nproc` npm install
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
tar -czvf smart-cone-frontend.tar.gz ./serve-frontend/
tar -czvf smart-cone-backend.tar.gz ./serve-frontend/

rm -rf ./smart-cone-package
mv ./smart-cone-frontend.tar.gz ./smart-cone-package
mv ./smart-cone-backend.tar.gz ./smart-cone-package

tar -czvf smart-cone-package.tar.gz ./smart-cone-package
