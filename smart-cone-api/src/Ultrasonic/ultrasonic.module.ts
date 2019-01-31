import { Module } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";
import * as fs from "fs";
import { UltrasonicService } from "./ultrasonic.service";
import { MockUltrasonicService } from "./mock-ultrasonic.service";
import { UltrasonicController } from "./ultrasonic.controller";

function isReal(): boolean {
    try {
        fs.readFileSync("/var/tmp/.ultrasonic-pin");
        return true;
    } catch (err) {
        return false;
    }
}

@Module({
    imports: [],
    exports: [BaseUltrasonicService],
    providers: [
        {
            provide: BaseUltrasonicService,
            useClass: isReal() ? UltrasonicService : MockUltrasonicService,
        },
    ],
    controllers: [UltrasonicController],
})
export class UltrasonicModule {}
