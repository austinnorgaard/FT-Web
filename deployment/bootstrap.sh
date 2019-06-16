#!/bin/bash

if [ -z "$1" ]
then
    echo "You must specify a cone type (smart or field). Usage: ./bootstrap.sh [field | smart]"
    exit -1
fi

# Make sure its either 'field' or 'smart', we dont support anything else
if [ "$1" != "field" ] && [ "$1" != "smart" ]
then
    echo "You must specify a cone type (smart or field). Usage: ./bootstrap.sh [field | smart] [field-cone-id]"
    exit -1
fi

# Check if we are bootstrapping a field-cone, if so, make sure an ID was specified
if [ "$1" == "field" ]
then
    case $2 in
        ''|*[!0-9]*) echo BAD!! ;;
        *) echo "Bootstrapping field cone with ID: $2" ;;
    esac
fi

# Sanitize everything in the deployment foder, maybe just the entire repo??
find ~/FT-WEB/deployment -type f -print0 | xargs -0 -n 1 -P 4 dos2unix

# Clone the repo, we expect the access token to be the first arg
# Our work directory will be ~/FT-WEB (which is auto-created on clone)

sudo rm -rf ~/FT-WEB
cd ~
echo "Github API Key: " ${GH_API_KEY}
git clone https://${GH_API_KEY}@github.com/darrenmsmith/FT-WEB.git

# Now that the repo has been cloned, we can access the deployment scripts located at

# Call the correct specific deployment script
if [ "$1" == "smart" ]
then
    cd ~/FT-WEB/deployment
    chmod +x ./bootstrap-smart-cone.sh
    ./bootstrap-smart-cone.sh
fi

if [ "$1" == "field" ]
then
    cd ~/FT-WEB/deployment
    chmod +x ./bootstrap-field-cone.sh
    ./bootstrap-field-cone.sh $2
fi