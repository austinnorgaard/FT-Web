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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const base_audio_service_1 = require("./base-audio.service");
class AudioFileDto {
}
exports.AudioFileDto = AudioFileDto;
let AudioController = class AudioController {
    constructor(audioService) {
        this.audioService = audioService;
        this._audioService = null;
        this._audioService = audioService;
    }
    setAudioFile(audioFile) {
        console.log("Playing audio file: ", audioFile.action);
        this._audioService.SetAction(audioFile.action);
    }
    playTestNoise(body) {
        this._audioService.PlayTestAudio();
    }
};
__decorate([
    common_1.Post("audio-file"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AudioFileDto]),
    __metadata("design:returntype", void 0)
], AudioController.prototype, "setAudioFile", null);
__decorate([
    common_1.Post("test-noise"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AudioController.prototype, "playTestNoise", null);
AudioController = __decorate([
    common_1.Controller("audio"),
    __metadata("design:paramtypes", [base_audio_service_1.BaseAudioService])
], AudioController);
exports.AudioController = AudioController;
//# sourceMappingURL=audio.controller.js.map