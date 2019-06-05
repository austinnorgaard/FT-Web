#!/bin/bash

echo "Installing audio-files"

tar xf ./audio-files.tar.gz

sudo rm -rf /var/tmp/ft-audio-files/
sudo mkdir /var/tmp/ft-audio-files
sudo chmod 777 /var/tmp/ft-audio-files
cp ./audio-files/* /var/tmp/ft-audio-files

echo "Done installing audio-files"