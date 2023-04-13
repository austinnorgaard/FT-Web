import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommsModule } from "./Comms/comms.module";

import * as util from "util";
import * as fs from "fs";
import { getFieldConeId, smartConeSocketUrl } from "./utils/environment-helper";
import { TiltModule } from "./Tilt/tilt.module";
import { UltrasonicModule } from "Ultrasonic/ultrasonic.module";
import { AudioModule } from "./Audio/audio.module";
import { WifiModule } from "./Wifi/wifi.module";

const readFile = util.promisify(fs.readFile);

@Module({
    imports: [CommsModule, TiltModule, UltrasonicModule, AudioModule, WifiModule],
    controllers: [AppController],
    providers: [AppService],
    exports: [TiltModule],
})
export class AppModule implements OnModuleInit {
    constructor() {}

    async onModuleInit() {
        const id = await getFieldConeId();
        console.log(
            `App module loaded -- Environment information
Cone ID: ${id}
Smart Cone Socket API URL: ${smartConeSocketUrl()}`,
        );
    }
}
