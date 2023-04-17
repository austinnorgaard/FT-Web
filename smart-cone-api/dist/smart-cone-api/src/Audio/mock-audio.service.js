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
let MockAudioService = class MockAudioService extends base_audio_service_1.BaseAudioService {
    constructor() {
        console.log("Using Mock Audio service, because we are not on a target platform");
        super();
    }
    PlayTestAudio() {
        console.log("Would've played the test audio here!! But this is the mock class");
    }
    SetAction(action) {
        console.log(`Wouldve set audio action here to: ${action}`);
    }
    PlayAction(action) {
        console.log(`MockAudio: Would've played audio for action`);
    }
};
MockAudioService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MockAudioService);
exports.MockAudioService = MockAudioService;
//# sourceMappingURL=mock-audio.service.js.map