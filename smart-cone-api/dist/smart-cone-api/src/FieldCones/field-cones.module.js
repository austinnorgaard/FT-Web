"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const field_cones_service_1 = require("./field-cones.service");
const field_cones_controller_1 = require("./field-cones.controller");
const wifi_module_1 = require("../Wifi/wifi.module");
let FieldConesModule = class FieldConesModule {
};
FieldConesModule = __decorate([
    common_1.Module({
        providers: [field_cones_service_1.FieldConesService],
        controllers: [field_cones_controller_1.FieldConesController],
        imports: [common_1.HttpModule, wifi_module_1.WifiModule],
        exports: [field_cones_service_1.FieldConesService],
    })
], FieldConesModule);
exports.FieldConesModule = FieldConesModule;
//# sourceMappingURL=field-cones.module.js.map