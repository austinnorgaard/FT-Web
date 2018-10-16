#!/bin/bash

sudo apt-get update -y

sudo apt-get install -y git sqlite3

# Clone the repo, we expect the access token to be the first arg
# Our work directory will be ~/FT-WEB (which is auto-created on clone)

sudo rm -rf ~/FT-WEB
echo "Github API Key: " ${GH_API_KEY}
git clone https://${GH_API_KEY}@github.com/darrenmsmith/FT-WEB.git
