#!/usr/bin/env python
import RPi.GPIO as GPIO

TiltPin = 7

def setup():
	GPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location
	GPIO.setup(TiltPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def handleTilt(data):
	print "Tilt!!"

def loop():
	GPIO.add_event_detect(TiltPin, GPIO.FALLING, callback=handleTilt, bouncetime=1000) # wait for falling
	while True:
		pass   # Don't do anything

def destroy():
	GPIO.cleanup()                     # Release resource

if __name__ == '__main__':     # Program start from here
	setup()
	try:
		loop()
	except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child program destroy() will be  executed.
		destroy()

