#!/bin/sh

docker pull freudek90/fieldtrainer-build:1.0

docker run -d --name ft-build freudek90/fieldtrainer-build:1.0 bash /root/FT-WEB/build-smart-cone.sh
