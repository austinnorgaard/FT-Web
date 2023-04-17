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
const spawn = require("threads").spawn;
let UltrasonicService = class UltrasonicService extends base_ultrasonic_service_1.BaseUltrasonicService {
    constructor() {
        super();
        this.thread = undefined;
        this.rateLimited = false;
        this.rateLimitTimeout = 2500;
        console.log("Using the real Ultrasonic Service");
        this.thread = spawn(async (input, done) => {
            const process = require('process');
            const rpio = require('rpio');
            const TRIG = 16;
            const ECHO = 18;
            const TRIGGER_THRESHOLD = 60;
            rpio.open(TRIG, rpio.OUTPUT);
            rpio.open(ECHO, rpio.INPUT);
            rpio.write(TRIG, rpio.LOW);
            while (true) {
                var pulse_start = undefined;
                var pulse_end = undefined;
                rpio.write(TRIG, rpio.HIGH);
                rpio.msleep(10);
                rpio.write(TRIG, rpio.LOW);
                while (rpio.read(ECHO) === 0) { }
                pulse_start = process.hrtime();
                while (rpio.read(ECHO) === 1) { }
                pulse_end = process.hrtime();
                var start = pulse_start[0] * 1000 + pulse_start[1] / (1000 * 1000);
                var end = pulse_end[0] * 1000 + pulse_end[1] / (1000 * 1000);
                const distance = ((end - start) * 17150 / 1000);
                if (distance <= TRIGGER_THRESHOLD) {
                    done(distance);
                }
                rpio.msleep(25);
            }
        });
        this.thread.send().on('message', () => {
            if (!this.rateLimited) {
                console.log('Ultrasonic tripped!!');
                this.UltrasonicEvent.next();
                this.rateLimited = true;
                setTimeout(() => {
                    this.rateLimited = false;
                }, 2500);
            }
            else {
            }
        });
    }
};
UltrasonicService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UltrasonicService);
exports.UltrasonicService = UltrasonicService;
//# sourceMappingURL=ultrasonic.service.js.map