#!/bin/bash
sudo docker pull freudek90/fieldtrainer-build:1.8
sudo docker rm ft-build
sudo docker run --name ft-build freudek90/fieldtrainer-build:1.8 sh -c "cd /root/FT-WEB && git checkout release && git pull && bash /root/FT-WEB/packaging/init-build.sh $1"
