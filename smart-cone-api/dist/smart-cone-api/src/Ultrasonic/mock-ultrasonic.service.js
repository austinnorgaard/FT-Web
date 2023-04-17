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
const base_ultrasonic_service_1 = require("./base-ultrasonic.service");
let MockUltrasonicService = class MockUltrasonicService extends base_ultrasonic_service_1.BaseUltrasonicService {
    constructor() {
        super();
        console.log("Using the mock ultrasonic service.");
    }
    emitUltrasonicEvent() {
        this.UltrasonicEvent.next();
    }
};
MockUltrasonicService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MockUltrasonicService);
exports.MockUltrasonicService = MockUltrasonicService;
//# sourceMappingURL=mock-ultrasonic.service.js.map