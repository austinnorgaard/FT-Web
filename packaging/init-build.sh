#!/bin/bash

# Setup the repo
cd ~/FT-WEB && git clean -fd && git checkout -- . && git checkout release && git pull

# Run the real script based on the passed in arg
echo "Running build script with name build-$1.sh"

case $1 in

	smart-cone)
		cd ~/FT-WEB && bash packaging/smart-cone/build-smart-cone.sh
		;;
	
	field-cone)
		cd ~/FT-WEB && bash packaging/field-cone/build-field-cone.sh
		;;
	
	smart-cone-system)
		cd ~/FT-WEB && bash packaging/smart-cone-system/build-smart-cone-system.sh
		;;

	*)
		exit 1
		;;
esac

