#!/bin/bash

# This script handles all deployment details for a Field Cone

# Install init.d scripts and set as default
# Our cwd needs to be in the deployment folder, so blow up if we can't
# find a script we know is in the deployment folder
if [ -f ./bootstrap.sh ]
then
    echo "This script must be run from the deployment folder!!"
    echo "Currently in the `pwd` folder!"
    exit 1
fi

# install the init.d script
sudo cp ./fieldcone /etc/init.d/fieldcone
sudo chmod +x /etc/init.d/fieldcone
update-rc.d fieldcone defaults

# Write the conetype file to /var/tmp
echo "fieldcone" > /var/tmp/.cone-type

