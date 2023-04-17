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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const training_session_setup_1 = require("./training-session-setup");
const training_service_1 = require("./training.service");
let TrainingController = class TrainingController {
    constructor(trainingService) {
        this.trainingService = trainingService;
    }
    get() {
        console.log("/training/get");
        return this.trainingService.trainingSessionState;
    }
    submitSessionSettings(sessionData) {
        this.trainingService.startSession(sessionData);
    }
    async saveResults() {
        await this.trainingService.saveResults();
    }
    async nextAthleteStarting() {
        try {
            const result = await this.trainingService.nextAthleteStarting();
            if (result) {
                console.log("Returning!");
                return;
            }
            else {
                console.log("Throwing!");
                throw new common_1.HttpException("No Athletes Left!!", common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (err) {
            console.log(`Something threw. Message ${err}`);
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "get", null);
__decorate([
    common_1.Post("start-session"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [training_session_setup_1.TrainingSessionSetup]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "submitSessionSettings", null);
__decorate([
    common_1.Post("save-results"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "saveResults", null);
__decorate([
    common_1.Post("next-athlete-starting"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "nextAthleteStarting", null);
TrainingController = __decorate([
    common_1.Controller("training"),
    __metadata("design:paramtypes", [training_service_1.TrainingService])
], TrainingController);
exports.TrainingController = TrainingController;
//# sourceMappingURL=training.controller.js.map