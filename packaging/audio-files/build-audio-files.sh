#!/bin/bash

echo "Assuming this script is being ran from the repo root! Dont be stupid, make sure you are in the root!"

echo "Packing audio files at ./deployment/audio-files"

rm -rf ./audio-files
mkdir audio-files
pushd .
cd ./deployment && tar -cf audio-files.tar.gz ./audio-files && mv ./audio-files.tar.gz ../audio-files
popd

cp ./packaging/audio-files/install.sh ./audio-files

BUILD_NUM="$(git rev-list --count HEAD)"
OUTPUT_NAME="audio-files-$BUILD_NUM.tar.gz"

tar -cf $OUTPUT_NAME ./audio-files

rm -rf ./audio-files

mkdir build_output
mv $OUTPUT_NAME ./build_output

echo "Files packaged to $OUTPUT_NAME"
