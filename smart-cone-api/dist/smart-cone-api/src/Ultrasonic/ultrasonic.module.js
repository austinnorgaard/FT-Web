"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const base_ultrasonic_service_1 = require("./base-ultrasonic.service");
const ultrasonic_service_1 = require("./ultrasonic.service");
const mock_ultrasonic_service_1 = require("./mock-ultrasonic.service");
const ultrasonic_controller_1 = require("./ultrasonic.controller");
const is_target_system_1 = require("../Utility/is-target-system");
let UltrasonicModule = class UltrasonicModule {
};
UltrasonicModule = __decorate([
    common_1.Module({
        imports: [],
        exports: [base_ultrasonic_service_1.BaseUltrasonicService],
        providers: [
            {
                provide: base_ultrasonic_service_1.BaseUltrasonicService,
                useClass: is_target_system_1.IsTargetSystem() ? ultrasonic_service_1.UltrasonicService : mock_ultrasonic_service_1.MockUltrasonicService,
            },
        ],
        controllers: [ultrasonic_controller_1.UltrasonicController],
    })
], UltrasonicModule);
exports.UltrasonicModule = UltrasonicModule;
//# sourceMappingURL=ultrasonic.module.js.map