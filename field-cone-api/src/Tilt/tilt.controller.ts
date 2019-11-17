import { Controller, Post } from "@nestjs/common"
import { BaseTiltService } from "./base-tilt-service";
import { TiltService } from "./tilt.service";

// This controller is used for interacting with tilt functionality on a real device

@Controller("tilt")
export class TiltController {
    _tiltService: TiltService = null;
    constructor(private readonly tiltService: BaseTiltService) {
        this._tiltService = tiltService as TiltService;
    }
    @Post("enable-tilts")
    public enableTilts() {
        this._tiltService.enabledForTilts = true; 
    }

    @Post("disable-tilts")
    public disableTilts() {
        this._tiltService.enabledForTilts = false;
    }
}