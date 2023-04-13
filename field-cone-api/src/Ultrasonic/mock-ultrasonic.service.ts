import { Injectable } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";

@Injectable()
export class MockUltrasonicService extends BaseUltrasonicService {
    constructor() {
        super();
        console.log("Using the mock ultrasonic service.");
    }

    emitUltrasonicEvent() {
        console.log("Ultrasonic!")
        this.UltrasonicEvent.next();
    }
}
