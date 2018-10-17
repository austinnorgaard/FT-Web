#!/bin/bash

if [ -z "$1" ]
then
    echo "You must specify a cone type (smart or field). Usage: ./bootstrap.sh [field | smart]"
    exit -1
fi

# Make sure its either 'field' or 'smart', we dont support anything else
if [ "$1" != "field" ] || [ "$1" != "smart" ]
then
    echo "You must specify a cone type (smart or field). Usage: ./bootstrap.sh [field | smart]"
    exit -1
fi

sudo apt-get update -y

sudo apt-get install -y git sqlite3

# Clone the repo, we expect the access token to be the first arg
# Our work directory will be ~/FT-WEB (which is auto-created on clone)

sudo rm -rf ~/FT-WEB
echo "Github API Key: " ${GH_API_KEY}
git clone https://${GH_API_KEY}@github.com/darrenmsmith/FT-WEB.git

# Now that the repo has been cloned, we can access the deployment scripts located at
# ./FT-WEB/deployment:w

# Call the correct specific deployment script
if [ "$1" == "smart" ]
then
    chmod +x ./bootstrap-smart-cone.sh
    ./bootstrap-smart-cone.sh
fi

if [ "$1" == "field" ]
then
    chmod +x ./bootstrap-field-cone.sh
    ./bootstrap-field-cone.sh
fi