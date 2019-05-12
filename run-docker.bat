echo "Running Docker Script"
docker pull freudek90/fieldtrainer-build:1.2

docker run --name ft-build freudek90/fieldtrainer-build:1.2 bash /root/FT-WEB/init-build.sh
