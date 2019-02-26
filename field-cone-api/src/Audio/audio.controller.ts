import { Controller, Post } from "@nestjs/common";
import { BaseAudioService } from "./base-audio.service";
import { AudioService } from "./audio.service";

@Controller("audio")
export class AudioController {
    private _audioService: AudioService = null;
    constructor(private readonly audioService: BaseAudioService) {
        this._audioService = audioService as AudioService;
    }

    @Post("test")
    public test() {
        this._audioService.PlayAction("sprint");
    }
}
