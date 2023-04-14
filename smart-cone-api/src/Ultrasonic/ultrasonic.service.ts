import { Injectable } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";

const spawn = require("threads").spawn;

// This is the real implementation, based on reading GPIO events
@Injectable()
export class UltrasonicService extends BaseUltrasonicService {
    thread: any = undefined;
    rateLimited: boolean = false;
    // ms
    rateLimitTimeout = 2500;

    constructor() {
        super();
        console.log("Using the real Ultrasonic Service");

        this.thread = spawn(async (input, done) => {
            const process = require('process');
            const rpio = require('rpio');

            // Using the physical port numbers
            const TRIG = 16;
            const ECHO = 18;

            const TRIGGER_THRESHOLD = 60;

            rpio.open(TRIG, rpio.OUTPUT);
            rpio.open(ECHO, rpio.INPUT);
            rpio.write(TRIG, rpio.LOW);

            while (true) {
                var pulse_start = undefined;
                var pulse_end = undefined;

                // Toggle the sound on and off quickly
                rpio.write(TRIG, rpio.HIGH);
                rpio.msleep(10);
                rpio.write(TRIG, rpio.LOW);

                // Wait for the ECHO sensor to go high
                while (rpio.read(ECHO) === 0) {}

                // Record this as our start time
                pulse_start = process.hrtime();

                // Wait for the ECHO sensor to go low
                while(rpio.read(ECHO) === 1) {}

                pulse_end = process.hrtime();

                // Convert the hrtimes into milliseconds
                var start = pulse_start[0] * 1000 + pulse_start[1] / (1000 * 1000);
                var end = pulse_end[0] * 1000 + pulse_end[1] / (1000 * 1000);

                // Distance is in centimeters
                const distance = ((end - start) * 17150 / 1000);

                if (distance <= TRIGGER_THRESHOLD) {
                    done(distance);
                }

                // don't thrash
                rpio.msleep(25);
            }
        });

        this.thread.send().on('message', () => {
            if (!this.rateLimited) {
                console.log('Ultrasonic tripped!!');
                this.UltrasonicEvent.next();
                this.rateLimited = true;
                setTimeout(() => {
                    this.rateLimited = false;
                }, 2500);
            } else {
                // do nothing, we are currently rate limited
            }
        });
    }
}