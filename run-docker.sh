#!/bin/bash

docker pull freudek90/fieldtrainer-build:1.2
#docker rm ft-build
docker run --name ft-build freudek90/fieldtrainer-build:1.2 bash /root/FT-WEB/init-build.sh
