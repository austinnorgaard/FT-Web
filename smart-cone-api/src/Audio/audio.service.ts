import { BaseAudioService } from "./base-audio.service";
import { Injectable } from "@nestjs/common";

// tslint:disable-next-line:no-var-requires
const player = require("play-sound")();

@Injectable()
export class AudioService extends BaseAudioService {
    // base path of all audio files
    private basePath = "/var/tmp/ft-audio-files";
    private action = "";
    private voiceGender = "male";
    // Look up table for action strings, to their filenames as they exist in the base path
    // prettier-ignore
    private actionPaths = {
        "sprint": `${this.basePath}/sprint_${this.voiceGender}.mp3`,
        "back-pedal": `${this.basePath}/back_pedal_${this.voiceGender}.mp3`,
        "jog": `${this.basePath}/jog_${this.voiceGender}.mp3`,
        "karaoke-left": `${this.basePath}/carioca_left_${this.voiceGender}.mp3`,
        "karaoke-right": `${this.basePath}/carioca_right_${this.voiceGender}.mp3`,
        "side-shuffle-left": `${this.basePath}/side_shuffle_left_${this.voiceGender}.mp3`,
        "side-shuffle-right": `${this.basePath}/side_shuffle_right_${this.voiceGender}.mp3`,
        "butt-kicks": `${this.basePath}/butt_kicks_${this.voiceGender}.mp3`,
        "bounds": `${this.basePath}/bounds_${this.voiceGender}.mp3`,
        "ext-hip-rotation": `${this.basePath}/ext_hip_rotation_${this.voiceGender}.mp3`,
        "high-knees": `${this.basePath}/high_knees_${this.voiceGender}.mp3`,
        "high-skips": `${this.basePath}/high_skips_${this.voiceGender}.mp3`,
        "int-hip-rotation": `${this.basePath}/int_hip_rotation_${this.voiceGender}.mp3`,
        "walking-lunge": `${this.basePath}/walking_lunge_${this.voiceGender}.mp3`,
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
