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
const athlete_registration_1 = require("./athlete-registration");
const athletes_service_1 = require("./athletes.service");
const common_2 = require("@nestjs/common");
const DatabaseEnums_1 = require("../Database/Data/DatabaseEnums");
const teams_service_1 = require("../Teams/teams.service");
const file_logger_1 = require("../Logging/file-logger");
let AthletesController = class AthletesController {
    constructor(athletesService, teamsService, logger) {
        this.athletesService = athletesService;
        this.teamsService = teamsService;
        this.logger = logger;
    }
    async create(athlete) {
        return await this.athletesService
            .addAthlete(athlete.athlete)
            .then(response => {
            if (athlete.team && athlete.team !== null) {
                this.teamsService
                    .addAthleteToTeam(athlete.team.id, response.data.athleteId)
                    .then(() => {
                    this.logger.log("Successfully added to team as well");
                })
                    .catch(err => {
                    this.logger.log(err);
                    throw Error(`Could not add athlete ${athlete.athlete.firstName} ${athlete.athlete.lastName} to team ${athlete.team.teamName}`);
                });
            }
        })
            .catch((err) => {
            this.logger.log(`Failed to add athlete. Reason: ${JSON.stringify(err)}`);
            if (err.failureType === DatabaseEnums_1.DatabaseFailureType.UniqueConstraintViolated) {
                throw new common_2.HttpException(err, common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_2.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async getAthletes() {
        return await this.athletesService
            .getAthletes()
            .then((response) => {
            return response;
        })
            .catch(err => {
            this.logger.log(`Failed to get athletes. Reason: ${JSON.stringify(err)}`);
            throw new common_2.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getAthlete(id) {
        return await this.athletesService.getAthlete(id);
    }
    async deleteAthlete(id) {
        this.logger.log(`Removing athlete with id ${id}`);
        return await this.athletesService
            .removeAthleteById(id)
            .then(response => {
            return;
        })
            .catch(err => {
            this.logger.log(`Database error removing athlete: ${err}`);
            throw new common_2.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [athlete_registration_1.AthleteRegistration]),
    __metadata("design:returntype", Promise)
], AthletesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AthletesController.prototype, "getAthletes", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AthletesController.prototype, "getAthlete", null);
__decorate([
    common_1.Delete(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AthletesController.prototype, "deleteAthlete", null);
AthletesController = __decorate([
    common_1.Controller("athletes"),
    __metadata("design:paramtypes", [athletes_service_1.AthletesService, teams_service_1.TeamsService, file_logger_1.FileLogger])
], AthletesController);
exports.AthletesController = AthletesController;
//# sourceMappingURL=athletes.controller.js.map