import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";

@Injectable()
export class TiltService extends BaseTiltService {
    constructor() {
        super();
    }
}
