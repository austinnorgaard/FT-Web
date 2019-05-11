#!/bin/sh

docker pull freudek90/fieldtrainer-build:latest

docker run -d --name ft-build freudek90/fieldtrainer-build:latest echo Hello
