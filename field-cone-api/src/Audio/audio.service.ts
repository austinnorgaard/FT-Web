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
        "sprint": `${this.basePath}/sprint.mp3`,
        "back-pedal": `${this.basePath}/back_pedal.mp3`,
        "jog": `${this.basePath}/jog.mp3`,
        "karaoke-left": `${this.basePath}/carioca_left.mp3`,
        "karaoke-right": `${this.basePath}/carioca_right.mp3`,
        "side-shuffle-left": `${this.basePath}/side_shuffle_left.mp3`,
        "side-shuffle-right": `${this.basePath}/side_shuffle_right.mp3`,
        "butt-kicks": `${this.basePath}/butt_kicks.mp3`,
        "bounds": `${this.basePath}/bounds.mp3`,
        "ext-hip-rotation": `${this.basePath}/ext_hip_rotation.mp3`,
        "high-knees": `${this.basePath}/high_knees.mp3`,
        "high-skips": `${this.basePath}/high_skips.mp3`,
        "int-hip-rotation": `${this.basePath}/int_hip_rotation.mp3`,
        "walking-lunge": `${this.basePath}/walking_lunge.mp3`,
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
            player.play(this.actionPaths[this.action], (err: any) => {
                if (err) {
                    console.log(`Error playing audio! Err: ${err}`);
                }
            });
        } else {
            console.log(`Error, could not find action ${this.action} in audio mappings. Is it new?`);
        }
    }

    SetAction(action: string): void {
        console.log(`Setting audio action to: ${action}`);
        this.action = action;
    }
}
