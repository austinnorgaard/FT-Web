import { Injectable, Inject } from "@nestjs/common";
import { BaseTiltService } from "./Tilt/base-tilt-service";

@Injectable()
export class AppService {
    constructor(private readonly tiltService: BaseTiltService) {}
    root(): string {
        return "Hello World!";
    }
}
