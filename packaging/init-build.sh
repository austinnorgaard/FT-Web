#!/bin/bash

# Setup the repo
cd ~/FT-WEB && git clean -fd && git checkout -- . && git checkout release && git pull

# Run the real script based on the passed in arg
echo "Running build script with name build-$1.sh"

case $1 in

	smart-cone)
		cd ~/FT-WEB && bash packaging/smart-cone/build-smart-cone.sh
		;;
	
	audio-files)
		cd ~/FT-WEB && bash packaging/audio-files/build-audio-files.sh
		;;

	*)
		exit 1
		;;
esac

