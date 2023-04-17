"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const status_controller_1 = require("./status.controller");
const database_module_1 = require("../Database/database.module");
const auth_module_1 = require("../Auth/auth.module");
const teams_module_1 = require("../Teams/teams.module");
const users_module_1 = require("../Users/users.module");
const athletes_module_1 = require("../Athletes/athletes.module");
const training_module_1 = require("../Training/training.module");
const logger_module_1 = require("../Logging/logger.module");
const field_cones_module_1 = require("../FieldCones/field-cones.module");
const front_end_comms_module_1 = require("../FrontEndComms/front-end-comms.module");
const ultrasonic_module_1 = require("../Ultrasonic/ultrasonic.module");
const tilt_module_1 = require("../Tilt/tilt.module");
const audio_module_1 = require("../Audio/audio.module");
const wifi_module_1 = require("../Wifi/wifi.module");
const app_service_1 = require("./app.service");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [
            wifi_module_1.WifiModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            teams_module_1.TeamsModule,
            users_module_1.UsersModule,
            athletes_module_1.AthletesModule,
            training_module_1.TrainingModule,
            logger_module_1.LoggerModule,
            front_end_comms_module_1.FrontEndCommsModule,
            field_cones_module_1.FieldConesModule,
            ultrasonic_module_1.UltrasonicModule,
            tilt_module_1.TiltModule,
            audio_module_1.AudioModule,
        ],
        controllers: [app_controller_1.AppController, status_controller_1.StatusController],
        exports: [tilt_module_1.TiltModule],
        providers: [app_service_1.AppService],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=app.module.js.map