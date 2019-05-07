import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

const spawn = require("threads").spawn;

@Injectable()
export class TiltService extends BaseTiltService {
    mpu: any = undefined;
    thread: any = undefined;
    rateLimited: boolean = false;
    constructor() {
        super();
        console.log("Using the Real Tilt Service");

        setInterval(() => {
            global.gc();
        }, 10000);

        this.thread = spawn((input, done) => {
            const mpu9250 = require("mpu9250");

            let mpu = new mpu9250({
                scaleValues: true,
                ACCEL_FS: 2,
            });

            mpu.initialize();

            while (true) {
                let values = mpu.getMotion6();
                let sum = Math.abs(values[0]) + Math.abs(values[1]) + Math.abs(values[2]);
                let avg = sum / 3;

                if (avg > 1.5) {
                    done(avg);
                }
            }
        });

        this.thread.send().on("message", () => {
            if (!this.rateLimited) {
                this.TiltOccured.next();
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
