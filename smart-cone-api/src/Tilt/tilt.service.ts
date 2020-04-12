import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

import * as fs from "fs";
import { Subject } from "rxjs";

const spawn = require("threads").spawn;

@Injectable()
export class TiltService extends BaseTiltService {
    mpu: any = undefined;
    thread: any = undefined;
    rateLimited: boolean = false;

    gyroTripped: Subject<void> = new Subject<void>();

    constructor() {
        super();
        console.log("Using the Real Tilt Service");
        this.gyroTripped.subscribe(() => {
            // If we are currently enabled for tilts, then go ahead and emit the real event
            if (this.tiltsEnabled()) {
                this.TiltOccured.next();
            }
        });

        this.thread = spawn(async (input, done) => {
            let calibrationFileExists = () => {
                try {
                    if (fs.existsSync("/var/tmp/accel_calibration.json")) {
                        console.log("Calibration file exists");
                        return true;
                    } else {
                        console.log("No calibration file..");
                        return false;
                    }
                } catch (err) {
                    console.log("No calibration file");
                    return false;
                }
            }
            let loadCalibration = () => {
                const contents = fs.readFileSync("/var/tmp/accel_calibration.json").toString();

                return JSON.parse(contents);
            }

            const mpu9250 = require("mpu9250");

            // Check if there is a calibration file for the sensor
            let mpu = null;
            if (calibrationFileExists()) {
                mpu = new mpu9250({
                    scaleValues: true,
                    ACCEL_FS: 2,
                    accelCalibration: loadCalibration(),
                });
            } else {
                mpu = new mpu9250({
                    scaleValues: true,
                    ACCEL_FS: 2,
                });
            }

            const sleep = async ms => {
                return new Promise(resolve => setTimeout(resolve, ms));
            };

            mpu.initialize();
            let counter = 0;
            const max = 10000;

            while (true) {
                let values = mpu.getMotion6();
                let sum = Math.abs(values[0]) + Math.abs(values[1]) + Math.abs(values[2]);
                let avg = sum / 3;

                if (avg > 1.0) {
                    done(avg);
                }

                counter++;
                if (counter > max) {
                    counter = 0;
                    await sleep(10);
                }
            }
        });

        this.thread.send().on("message", () => {
            if (!this.rateLimited) {
                this.gyroTripped.next();
                this.rateLimited = true;
                setTimeout(() => {
                    this.rateLimited = false;
                }, 2500);
            } else {
                // do nothing
            }
        });
    }

}
