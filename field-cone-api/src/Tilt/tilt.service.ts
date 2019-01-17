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
        gpio.setup(0);
    }

    private getTiltPing(): number {
        const text = fs.readFileSync("/var/tmp/.tilt-gpio-pin").toString("ascii");
        return parseInt(text, 10);
    }
}
