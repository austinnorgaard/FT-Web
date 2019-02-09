import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

import * as gpio from "rpi-gpio";
import * as fs from "fs";

@Injectable()
export class TiltService extends BaseTiltService {
    constructor() {
        super();
        console.log("Using the Real Tilt Service");

        // do gpio setup
        gpio.setup(this.getTiltPin());
        gpio.on("change", (channel, value) => {
            console.log("Channel " + channel + " value is now " + value);
            this.TiltOccured.next();
        });
    }

    private getTiltPin(): number {
        return 32;
    }
}
