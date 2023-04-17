"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_audio_service_1 = require("./base-audio.service");
const common_1 = require("@nestjs/common");
const player = require("play-sound")();
let AudioService = class AudioService extends base_audio_service_1.BaseAudioService {
    constructor() {
        super();
        this.basePath = "/var/tmp/ft-audio-files";
        this.action = "";
        this.voiceGender = "male";
        this.actionPaths = {
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
            "beep": `${this.basePath}/beep.mp3`
        };
        console.log("Using real audio service");
    }
    PlayAction(action) {
        if (action in this.actionPaths) {
            console.log(`Playing audio file: ${this.actionPaths[action]}`);
            player.play(this.actionPaths[action], (err) => {
                if (err) {
                    console.log(`Error playing audio! Err: ${err}`);
                }
            });
        }
        else {
            console.log(`Error, could not find action ${action} in audio mappings. Is it new?`);
        }
    }
    SetAction(action) {
        console.log(`Setting audio action to: ${action}`);
        this.action = action;
    }
    PlayTestAudio() {
        player.play(this.actionPaths["sprint"], (err) => {
            if (err) {
                console.log("Couldnt play test audio!");
                console.log(err);
            }
        });
    }
};
AudioService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AudioService);
exports.AudioService = AudioService;
//# sourceMappingURL=audio.service.js.map