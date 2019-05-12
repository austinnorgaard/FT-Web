#!/bin/bash
uname -a
apt-get install qemu-user-static
docker pull freudek90/fieldtrainer-build:1.3
#docker rm ft-build
docker run --name ft-build freudek90/fieldtrainer-build:1.3
