import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

@Injectable()
export class MockTiltService extends BaseTiltService {
    constructor() {
        console.log("Using the Mock Tilt Service");
        super();
    }
}
