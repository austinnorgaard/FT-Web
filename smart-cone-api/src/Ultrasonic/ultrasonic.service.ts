import { Injectable } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";

// This is the real implementation, based on reading GPIO events
@Injectable()
export class UltrasonicService extends BaseUltrasonicService {
    constructor() {
        super();
        console.log("Using the real Ultrasonic Service");
    }
}
