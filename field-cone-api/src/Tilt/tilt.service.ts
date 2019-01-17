import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

@Injectable()
export class TiltService extends BaseTiltService {
    constructor() {
        console.log("Using the Real Tilt Service");
        super();
    }
}
