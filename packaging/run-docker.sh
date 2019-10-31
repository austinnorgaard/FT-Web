#!/bin/bash
echo "Args:"
echo $1
echo $2
echo $3
sudo docker pull freudek90/fieldtrainer-build:1.8
sudo docker rm ft-build
sudo docker run --name ft-build freudek90/fieldtrainer-build:1.8 sh -c "cd /root/FT-WEB && git checkout $2 && git pull && bash /root/FT-WEB/packaging/init-build.sh $1 $2 $3"
