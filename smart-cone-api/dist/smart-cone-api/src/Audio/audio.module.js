"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const base_audio_service_1 = require("./base-audio.service");
const fs = require("fs");
const audio_service_1 = require("./audio.service");
const mock_audio_service_1 = require("./mock-audio.service");
const audio_controller_1 = require("./audio.controller");
function isReal() {
    try {
        fs.readFileSync("/var/tmp/.cone-type");
        return true;
    }
    catch (err) {
        return false;
    }
}
let AudioModule = class AudioModule {
};
AudioModule = __decorate([
    common_1.Module({
        imports: [],
        exports: [base_audio_service_1.BaseAudioService],
        providers: [
            {
                provide: base_audio_service_1.BaseAudioService,
                useClass: isReal() ? audio_service_1.AudioService : mock_audio_service_1.MockAudioService,
            },
        ],
        controllers: [audio_controller_1.AudioController],
    })
], AudioModule);
exports.AudioModule = AudioModule;
//# sourceMappingURL=audio.module.js.map