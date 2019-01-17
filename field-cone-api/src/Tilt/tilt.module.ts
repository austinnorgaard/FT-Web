import { Module, DynamicModule } from "@nestjs/common";
import { TiltService } from "./tilt.service";

import * as gpio from "rpi-gpio";
import * as fs from "fs";
import * as util from "util";
import { MockTiltService } from "./mock-tilt.service";
import { BaseTiltService } from "./base-tilt-service";

const fsPromise = util.promisify(fs.readFile);

function isReal(): boolean {
    try {
        fs.readFileSync("/var/tmp/.tilt-gpio-pin");
        return true;
    } catch (err) {
        return false;
    }
}

@Module({
    imports: [],
    exports: [BaseTiltService],
    providers: [
        {
            provide: BaseTiltService,
            useClass: isReal() ? TiltService : MockTiltService,
        },
    ],
    controllers: [],
})
export class TiltModule {
    /*     static forRoot(): DynamicModule {
        // The tilt device writes a value to a single GPIO pin
        // We want this to be easy to change, so the value is written
        // to a file on the Pi.
        // Located at: /var/tmp/.tilt-gpio-pin
        let pinText = "";
        let real = false;

        try {
            pinText = fs.readFileSync("/var/tmp/.tilt-gpio-pin").toString();

            // parse out the pin # and make sure its convertable. Don't store, we do
            // this as a check if we are on a valid target system
            const num = parseInt(pinText, 10);
            real = true;
        } catch (err) {
            // Couldn't read file or it was invalid, make sure we return a blank module which does nothing
            real = false;
        }

        const tiltService = {
            provide: BaseTiltService,
            useClass: real ? TiltService : MockTiltService,
        };

        if (real) {
            console.log("We are using the real Tilt Service");
        } else {
            console.log("We are using the mock Titl Service");
        }

        return {
            module: TiltModule,
            providers: [tiltService],
            exports: [tiltService],
        } as DynamicModule;
    } */

    constructor() {}
}
