import { Module } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";
import { UltrasonicService } from "./ultrasonic.service";
import { MockUltrasonicService } from "./mock-ultrasonic.service";
import { UltrasonicController } from "./ultrasonic.controller";
import * as fs from "fs";
import { TestController } from "./test.controller";

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
    exports: [BaseUltrasonicService],
    providers: [
        {
            provide: BaseUltrasonicService,
            useClass: isReal() ? UltrasonicService : MockUltrasonicService,
        },
    ],
    controllers: [TestController, UltrasonicController],
})
export class UltrasonicModule {
    constructor() {}
}
