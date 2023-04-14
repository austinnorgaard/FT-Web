import { Module } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";
import { UltrasonicService } from "./ultrasonic.service";
import { MockUltrasonicService } from "./mock-ultrasonic.service";
import { UltrasonicController } from "./ultrasonic.controller";
import { IsTargetSystem } from "../Utility/is-target-system";

@Module({
    imports: [],
    exports: [BaseUltrasonicService],
    providers: [
        {
            provide: BaseUltrasonicService,
            useClass: IsTargetSystem() ? UltrasonicService : MockUltrasonicService,
        },
    ],
    controllers: [UltrasonicController],
})
export class UltrasonicModule {}