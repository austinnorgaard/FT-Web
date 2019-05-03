import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

const spawn = require('threads').spawn;

@Injectable()
export class TiltService extends BaseTiltService {
    mpu: any = undefined;
    thread: any = undefined;
    constructor() {
        super();
        console.log("Using the Real Tilt Service");

        this.thread = spawn((input, done) => {
            let rateLimited: boolean = false;
            const mpu9250 = require('9250');

            let mpu = new mpu9250({
                scaleValues: true,
                ACCEL_FS: 3
            });

            mpu.initialize();

            while (true) {
                let values = mpu.getMotion6();
                let sum = Math.abs(values[0]) + Math.abs(values[1]) + Math.abs(values[2]);
                let avg = sum / 3;

                if (avg > 5) {
                    if (!rateLimited) {
                        done(avg);
                        // rate limit ourselves
                        rateLimited = true;
                        setTimeout(() => {
                            rateLimited = false;
                        }, 2500);
                    } else {
                        // do nothing as we are rate limited
                    }
                }
            }
        });

        this.thread.send().on('message', function(response) {
            console.log('Tilt!!');
        });
    }
}
