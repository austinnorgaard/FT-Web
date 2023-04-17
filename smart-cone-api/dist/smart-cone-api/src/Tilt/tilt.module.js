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
const common_1 = require("@nestjs/common");
const tilt_service_1 = require("./tilt.service");
const mock_tilt_service_1 = require("./mock-tilt.service");
const base_tilt_service_1 = require("./base-tilt-service");
const fs = require("fs");
const test_controller_1 = require("./test.controller");
function isReal() {
    try {
        fs.readFileSync("/var/tmp/.tilt-gpio-pin");
        return true;
    }
    catch (err) {
        return false;
    }
}
let TiltModule = class TiltModule {
    constructor() { }
};
TiltModule = __decorate([
    common_1.Module({
        imports: [],
        exports: [base_tilt_service_1.BaseTiltService],
        providers: [
            {
                provide: base_tilt_service_1.BaseTiltService,
                useClass: isReal() ? tilt_service_1.TiltService : mock_tilt_service_1.MockTiltService,
            },
        ],
        controllers: [test_controller_1.TestController],
    }),
    __metadata("design:paramtypes", [])
], TiltModule);
exports.TiltModule = TiltModule;
//# sourceMappingURL=tilt.module.js.map