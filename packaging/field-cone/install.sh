#!/bin/bash

# Package: field-cone

echo "[field-cone-install]: Killing node..."
sudo killall node

# This script assumes it ran next to the tar ball
echo "[field-cone-install]: Unpacking field-cone files"
tar xf field-cone.tar.gz

echo "[field-cone-install]: Removing existing installation"
sudo rm -rf /opt/field-cone-api

echo "[field-cone-install]: Installing new installation"
sudo mv ./field-cone-api /opt/


sudo mv ./fieldcone /etc/init.d/fieldcone
sudo chmod +x /etc/init.d/fieldcone
sudo update-rc.d fieldcone defaults

sudo systemctl daemon-reload
