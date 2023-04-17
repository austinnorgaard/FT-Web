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
const base_tilt_service_1 = require("./base-tilt-service");
const fs = require("fs");
const rxjs_1 = require("rxjs");
const spawn = require("threads").spawn;
let TiltService = class TiltService extends base_tilt_service_1.BaseTiltService {
    constructor() {
        super();
        this.mpu = undefined;
        this.thread = undefined;
        this.rateLimited = false;
        this.gyroTripped = new rxjs_1.Subject();
        console.log("Using the Real Tilt Service");
        this.gyroTripped.subscribe(() => {
            if (this.tiltsEnabled()) {
                this.TiltOccured.next();
            }
        });
        this.thread = spawn(async (input, done) => {
            let calibrationFileExists = () => {
                try {
                    if (fs.existsSync("/var/tmp/accel_calibration.json")) {
                        console.log("Calibration file exists");
                        return true;
                    }
                    else {
                        console.log("No calibration file..");
                        return false;
                    }
                }
                catch (err) {
                    console.log("No calibration file");
                    return false;
                }
            };
            let loadCalibration = () => {
                const contents = fs.readFileSync("/var/tmp/accel_calibration.json").toString();
                return JSON.parse(contents);
            };
            const mpu9250 = require("mpu9250");
            let mpu = null;
            if (calibrationFileExists()) {
                mpu = new mpu9250({
                    scaleValues: true,
                    ACCEL_FS: 2,
                    accelCalibration: loadCalibration(),
                });
            }
            else {
                mpu = new mpu9250({
                    scaleValues: true,
                    ACCEL_FS: 2,
                });
            }
            const sleep = async (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            };
            mpu.initialize();
            let counter = 0;
            const max = 10000;
            while (true) {
                let values = mpu.getMotion6();
                let sum = Math.abs(values[0]) + Math.abs(values[1]) + Math.abs(values[2]);
                let avg = sum / 3;
                if (avg > 1.0) {
                    done(avg);
                }
                counter++;
                if (counter > max) {
                    counter = 0;
                    await sleep(10);
                }
            }
        });
        this.thread.send().on("message", () => {
            if (!this.rateLimited) {
                this.gyroTripped.next();
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
TiltService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], TiltService);
exports.TiltService = TiltService;
//# sourceMappingURL=tilt.service.js.map