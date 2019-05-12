#!/bin/bash

# Setup the repo
cd ~/FT-WEB && git clean -fd && git checkout -- . && git checkout master && git pull

# Run the real script
cd ~/FT-WEB && bash build-smart-cone.sh
