"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class BaseUltrasonicService {
    constructor() {
        this.UltrasonicEvent = new rxjs_1.Subject();
    }
}
exports.BaseUltrasonicService = BaseUltrasonicService;
//# sourceMappingURL=base-ultrasonic.service.js.map