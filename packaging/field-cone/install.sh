#!/bin/bash

# Package: field-cone

sudo killall node

# This script assumes it ran next to the tar ball
tar xf field-cone.tar.gz

sudo rm -rf /opt/field-cone-api
sudo mv ./field-cone-api /opt/

sudo mv ./fieldcone /etc/init.d/fieldcone
sudo chmod +x /etc/init.d/fieldcone
sudo update-rc.d fieldcone defaults

sudo systemctl daemon-reload
sudo systemctl restart fieldcone