#!/bin/bash

# This script assumes that it is being run on a completely fresh installation of raspbian, and makes no assumptions about what is or is not installed

sudo apt-get update -y

# the version of node served via apt is ancient, nuke it
sudo apt-get remove nodejs npm

sudo apt-get install -y git
# install NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
source ~/.nvm/nvm.sh
nvm install --lts

node -v

# Clone the repo, we expect the access token to be the first arg
# Our work directory will be ~/FT-WEB (which is auto-created on clone)

sudo rm -rf ~/FT-WEB
echo "Github API Key: " ${GH_API_KEY}
git clone https://${GH_API_KEY}@github.com/darrenmsmith/FT-WEB.git
