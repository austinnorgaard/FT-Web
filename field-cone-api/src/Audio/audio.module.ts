import { Module } from "@nestjs/common";
import { BaseAudioService } from "./base-audio.service";

import * as fs from "fs";
import { AudioService } from "./audio.service";
import { MockAudioService } from "./mock-audio.service";
import { AudioController } from "./audio.controller";
import { TiltModule } from "../Tilt/tilt.module";

// Should we use the fake audio service, or the real one?
function isReal(): boolean {
    try {
        // if this file exists, we're definitely on the target platform
        fs.readFileSync("/var/tmp/.cone-type");
        return true;
    } catch (err) {
        // must be on a dev machine
        return false;
    }
}

@Module({
    imports: [TiltModule],
    exports: [],
    providers: [
        {
            provide: BaseAudioService,
            useClass: isReal() ? AudioService : MockAudioService,
        },
    ],
    controllers: [AudioController],
})
export class AudioModule {}
