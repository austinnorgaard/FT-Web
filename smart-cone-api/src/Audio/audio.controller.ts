import { Controller, Post, Body } from "@nestjs/common";
import { BaseAudioService } from "./base-audio.service";
import { AudioService } from "./audio.service";

export class AudioFileDto {
    action: string;
}

@Controller("audio")
export class AudioController {
    private _audioService: AudioService = null;
    constructor(private readonly audioService: BaseAudioService) {
        this._audioService = audioService as AudioService;
    }

    @Post("audio-file")
    public setAudioFile(@Body() audioFile: AudioFileDto) {
        // Set the audio file to be played by this cone
        console.log("Playing audio file: ", audioFile.action);
        this._audioService.SetAction(audioFile.action);
    }

    @Post("test-noise")
    public playTestNoise(@Body() body: any) {
        this._audioService.PlayTestAudio();
    }
}
