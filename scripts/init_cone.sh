#!/bin/sh

### BEGIN INIT INFO
# Provides:         init_cone.sh
# Required-Start:   $local_fs $remote_fs $network $time
# Required-Stop:
# Should-Stop:
# X-Start-Before:
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Bootstrap device after first boot
# Description:
### END INIT INFO

case "$1" in
stop)
    # no stop condition, but print for debug
    echo "InitCone stop called"
    ;;

start)
    echo "Starting InitCone script."
    echo "Checking if we've already run & completed before"

    # There will be a file in /var/tmp called 'cone_init_done'
    # If this file exists, then we've run this before and finished
    # if not, then we should try again
    if [ -f "/var/tmp/cone_init_done" ]; then
        echo "We've already completed cone initialization. Exiting"
        exit 0
    fi

    echo "Doing first time cone initialization"

    # The ft-update tool should be installed, run it and check the output
    # If its 42 (pretty likely), then rerun the update tool. If we get back any
    # non-zero error code, we've failed. otherwise we can create the 'cone_init_done'
    # file

    # Set the env vars that ft-update needs
    . /var/tmp/ft_environment
    ft-update
    ec=$?
    if [ $ec -eq 42 ]; then
	    echo "ft-update needed to update itself, rerunning"
	    ft-update
	    ec=$?
    fi
    if [ $ec -eq 0 ]; then
	    echo "Update client successful"
        touch /var/tmp/cone_init_done
        exit 0
    else
        echo "Failed to initialize! ft-update returned non-zero exit code!"
        echo "Logs from last ft-update run should be present at: /var/tmp/ft-update-logs.txt"
        exit 1
    fi
    ;;

restart)
    stop
    start
    ;;

*)
    echo "Usage: ${0:-} {start|stop|restart}" >&2
    exit 1
    ;;
esac