import { Module } from "@nestjs/common";
import { BaseAudioService } from "./base-audio.service";

import { AudioService } from "./audio.service";
import { MockAudioService } from "./mock-audio.service";
import { AudioController } from "./audio.controller";
import { TiltModule } from "../Tilt/tilt.module";
import { IsTargetSystem } from "../utils/is-target-system";


@Module({
    imports: [TiltModule],
    exports: [],
    providers: [
        {
            provide: BaseAudioService,
            useClass: IsTargetSystem() ? AudioService : MockAudioService,
        },
    ],
    controllers: [AudioController],
})
export class AudioModule {}
