"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const training_controller_1 = require("./training.controller");
const training_service_1 = require("./training.service");
const field_cones_module_1 = require("../FieldCones/field-cones.module");
const front_end_comms_module_1 = require("../FrontEndComms/front-end-comms.module");
const ultrasonic_module_1 = require("../Ultrasonic/ultrasonic.module");
const tilt_module_1 = require("../Tilt/tilt.module");
const audio_module_1 = require("../Audio/audio.module");
let TrainingModule = class TrainingModule {
    configure(consumer) {
    }
};
TrainingModule = __decorate([
    common_1.Module({
        imports: [field_cones_module_1.FieldConesModule, front_end_comms_module_1.FrontEndCommsModule, ultrasonic_module_1.UltrasonicModule, common_1.HttpModule, tilt_module_1.TiltModule, audio_module_1.AudioModule],
        providers: [training_service_1.TrainingService],
        controllers: [training_controller_1.TrainingController],
    })
], TrainingModule);
exports.TrainingModule = TrainingModule;
//# sourceMappingURL=training.module.js.map