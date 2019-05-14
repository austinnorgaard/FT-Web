#!/bin/bash
uname -a
apt-get update -y && apt-get install -y qemu-user-static
docker pull freudek90/fieldtrainer-build:1.4
#docker rm ft-build
docker run --name ft-build freudek90/fieldtrainer-build:1.4 bash /root/FT-WEB/init-build.sh
