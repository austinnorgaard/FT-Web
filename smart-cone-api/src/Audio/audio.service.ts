import { BaseAudioService } from "./base-audio.service";
import { Injectable } from "@nestjs/common";

// tslint:disable-next-line:no-var-requires
const player = require("play-sound")();

@Injectable()
export class AudioService extends BaseAudioService {
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

    constructor() {
        super();
        console.log("Using real audio service");
    }

    async PlayAction(action: string): Promise<void> {
        // implement audio playback here
        if (action in this.actionPaths) {
            // play it!
            console.log(`Playing audio file: ${this.actionPaths[action]}`);
            player.play(this.actionPaths[action], (err: any) => {
                if (err) {
                    console.log(`Error playing audio! Err: ${err}`);
                }
            });
        } else {
            console.log(`Error, could not find action ${action} in audio mappings. Is it new?`);
        }
    }

    SetAction(action: string): void {
        console.log(`Setting audio action to: ${action}`);
        this.action = action;
    }

    PlayTestAudio(): void {
        player.play(this.actionPaths["sprint"], (err: any) => {
            if (err) {
                console.log("Couldnt play test audio!");
                console.log(err);
            }
        });
    }
}