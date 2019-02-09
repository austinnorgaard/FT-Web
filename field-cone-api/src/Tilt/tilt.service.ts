import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

import * as gpio from "rpi-gpio";
import * as fs from "fs";

@Injectable()
export class TiltService extends BaseTiltService {
    rateLimited: boolean = false;
    constructor() {
        super();
        console.log("Using the Real Tilt Service");

        // do gpio setup
        gpio.setup(this.getTiltPin(), gpio.DIR_IN, gpio.EDGE_RISING);
        gpio.on("change", (channel, value) => {
            // console.log("Channel " + channel + " value is now " + value);
            if (!this.rateLimited) {
                this.TiltOccured.next();
                this.rateLimited = true;
                setTimeout(() => {
                    this.rateLimited = false;
                }, 5000);
            } else {
                // do nothing
            }
        });
    }

    private getTiltPin(): number {
        return 32;
    }
}
