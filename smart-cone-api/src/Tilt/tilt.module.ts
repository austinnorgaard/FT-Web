import { Module, DynamicModule } from "@nestjs/common";
import { TiltService } from "./tilt.service";
import { MockTiltService } from "./mock-tilt.service";
import { BaseTiltService } from "./base-tilt-service";

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
    exports: [BaseTiltService],
    providers: [
        {
            provide: BaseTiltService,
            useClass: isReal() ? TiltService : MockTiltService,
        },
    ],
    controllers: [TestController],
})
export class TiltModule {
    constructor() {}
}
