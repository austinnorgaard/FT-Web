import { Controller, Post } from "@nestjs/common";
import { BaseTiltService } from "./base-tilt-service";
import { TiltService } from "./tilt.service";

// This controller is used for interacting with tilt functionality on a real device

@Controller("tilt")
export class TiltController {
    constructor(private readonly tiltService: BaseTiltService) {
    }
    @Post("enable-tilts")
    public enableTilts() {
        this.tiltService.setTiltsEnabled(true);
    }

    @Post("disable-tilts")
    public disableTilts() {
        this.tiltService.setTiltsEnabled(false);
    }
}
