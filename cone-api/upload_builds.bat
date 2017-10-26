@echo off
for %%x in (
    192.168.1.21
    192.168.1.22
    192.168.1.23
) do (
    pscp -pw raspberry ./dist/* pi@%%x:/home/pi/test_dir
)
