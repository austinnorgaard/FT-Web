import { BaseUltrasonicService } from "./base-ultrasonic.service";

export class MockUltrasonicService extends BaseUltrasonicService {
    constructor() {
        super();
        console.log("Using the mock ultrasonic service.");
    }

    emitUltrasonicEvent() {
        console.log("Ultrasonic!");
    }
}
