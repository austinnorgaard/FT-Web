import { BaseAudioService } from "./base-audio.service";
import { Injectable } from "@nestjs/common";

import * as player from "play-sound";

@Injectable()
export class AudioService implements BaseAudioService {
    // base path of all audio files
    private basePath = "/var/tmp/ft-audio-files";

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

    constructor() {
        console.log("Using real audio service");
    }

    PlayAction(action: string): void {
        // implement audio playback here
        if (action in this.actionPaths) {
            // play it!
            player.play(this.actionPaths[action], err => {
                console.log(`Error playing audio! Err: ${err}`);
            });
        } else {
            console.log(`Error, could not find action ${action} in audio mappings. Is it new?`);
        }
    }
}
