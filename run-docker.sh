#!/bin/bash
sudo docker pull freudek90/fieldtrainer-build:1.6
sudo docker rm ft-build
sudo docker run --name ft-build freudek90/fieldtrainer-build:1.6 bash /root/FT-WEB/init-build.sh
