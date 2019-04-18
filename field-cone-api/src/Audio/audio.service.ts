import { BaseAudioService } from "./base-audio.service";
import { Injectable } from "@nestjs/common";
import { BaseTiltService } from "../Tilt/base-tilt-service";
import { TiltService } from "../Tilt/tilt.service";

// tslint:disable-next-line:no-var-requires
const player = require("play-sound")();

@Injectable()
export class AudioService implements BaseAudioService {
    // base path of all audio files
    private basePath = "/var/tmp/ft-audio-files";
    private action = "";
    // Look up table for action strings, to their filenames as they exist in the base path
    // prettier-ignore
    private actionPaths = {
        "sprint": `${this.basePath}/sprint_action.mp3`,
        "base-back-pedal": `${this.basePath}/base_back_pedal.mp3`,
        "hurdle": `${this.basePath}/hurdle_action.mp3`,
        "jog": `${this.basePath}/jog_action.mp3`,
        "karaoke": `${this.basePath}/karaoke_action.mp3`,
        "ladder": `${this.basePath}/ladder_action.mp3`,
        "side-step-left": `${this.basePath}/side_step_left_action.mp3`,
        "side-step-right": `${this.basePath}/side_step_right_action.mp3`,
    };

    constructor(private tiltService: BaseTiltService) {
        console.log("Using real audio service");

        (tiltService as TiltService).TiltOccured.subscribe(event => {
            // whenever a tilt occurs, play our audio action!
            this.PlayAction();
        });
    }

    async PlayAction(): Promise<void> {
        // implement audio playback here
        if (this.action in this.actionPaths) {
            // play it!
            console.log(`Playing audio file: ${this.actionPaths[this.action]}`);
            player.play(this.actionPaths[this.action], err => {
                if (err) {
                    console.log(`Error playing audio! Err: ${err}`);
                }
            });
        } else {
            console.log(`Error, could not find action ${this.action} in audio mappings. Is it new?`);
        }
    }

    SetAction(action: string): void {
        this.action = action;
    }
}