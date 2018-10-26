#!/bin/bash

# This script handles all deployment details for a Smart Cone

if [ -f ./bootstrap.sh ]
then
    echo "This script must be run from the deployment folder!!"
    exit 1
fi

sudo cp ./smartcone /etc/init.d/smartcone
sudo chmod +x /etc/init.d/smartcone
sudo update-rc.d smartcone defaults

echo "smartcone" > /var/tmp/.cone-type