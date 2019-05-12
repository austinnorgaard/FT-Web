#!/bin/sh

# Setup the repo
cd /root/FT-WEB && git clean -fd && git checkout -- . && git checkout master && git pull

# Run the real script
cd /root/FT-WEB && bash build-smart-cone.sh
