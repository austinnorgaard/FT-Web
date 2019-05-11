#!/bin/sh

# Do the NPM installs up front, as we have cross-project dependencies, so
# before we get into the actual building, need everything installed

cd ~/FT-WEB/field-trainer/field-trainer/ && JOBS=`nproc` npm install
cd ~/FT-WEB/smart-cone-api/ && JOBS=`nproc` npm install
cd ~/FT-WEB/serve-frontend/ && JOBS=`nproc` npm install

# Invoke each of the individual projects build scripts
sh ~/FT-WEB/field-trainer/field-trainer/build.sh || exit -1
sh ~/FT-WEB/smart-cone-api/build.sh || exit -1

# The frontend will have created a dist folder, just need copy the contents into the serve folder
rm -rf ~/FT-WEB/serve-frontend/dist
mv ~/FT-WEB/field-trainer/field-trainer/dist ~/FT-WEB/serve-frontend

# We can zip up the entire serve-frontend folder, ready for deployment
cd ~/FT-WEB
tar -czvf smart-cone-frontend.tar.gz serve-frontend/
tar -czvf smart-cone-backend.tar.gz serve-frontend/

rm -rf ./smart-cone-package
mv ./smart-cone-frontend.tar.gz ./smart-cone-package
mv ./smart-cone-backend.tar.gz ./smart-cone-package

tar -czvf smart-cone-package.tar.gz ./smart-cone-package
