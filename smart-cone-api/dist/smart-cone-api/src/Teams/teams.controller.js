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
const teams_service_1 = require("./teams.service");
const DatabaseEnums_1 = require("../Database/Data/DatabaseEnums");
const team_1 = require("./team");
const file_logger_1 = require("../Logging/file-logger");
let TeamsController = class TeamsController {
    constructor(teamsService, logger) {
        this.teamsService = teamsService;
        this.logger = logger;
    }
    async create(team) {
        return await this.teamsService
            .addTeam(team)
            .then(response => {
            this.logger.log("Team added!!");
            return;
        })
            .catch(reason => {
            this.logger.log(`Failed to add team. Reason: ${JSON.stringify(reason)}`);
            if (reason.failureType === DatabaseEnums_1.DatabaseFailureType.UniqueConstraintViolated) {
                throw new common_1.HttpException(reason, common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException(reason, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async getTeams() {
        return await this.teamsService
            .getTeams()
            .then((response) => {
            return response;
        })
            .catch(err => {
            this.logger.log(`Failed to get teams. Reason: ${JSON.stringify(err)}`);
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getTeamById(id) {
        return await this.teamsService
            .getTeamById(id)
            .then((team) => {
            return team;
        })
            .catch((err) => {
            this.logger.log(`Failed to get team with id ${id}. Reason: ${JSON.stringify(err)}`);
            throw new common_1.HttpException(`Team with id ${id} was not found.`, common_1.HttpStatus.NOT_FOUND);
        });
    }
    async addAthleteToTeam(teamId, athleteId) {
        this.logger.log("Add-athlete");
        return await this.teamsService
            .addAthleteToTeam(teamId, athleteId)
            .then(response => {
            this.logger.log("Athlete added successfully.");
            return response;
        })
            .catch((response) => {
            this.logger.log(`Failed to add athlete to team. Reason: ${JSON.stringify(response)}`);
            throw new common_1.HttpException(response, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async removeAthleteFromTeam(teamId, athleteId) {
        this.logger.log("Remove athlete");
        return await this.teamsService
            .removeAthleteFromTeam(teamId, athleteId)
            .then(response => {
            this.logger.log("Athlete removed successfully.");
            return response;
        })
            .catch((response) => {
            this.logger.log(`Failed to remove athlete from team. Reason: ${JSON.stringify(response)}`);
            throw new common_1.HttpException(response, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_1.Team]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getTeams", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getTeamById", null);
__decorate([
    common_1.Put(":teamId/athletes/:athleteId"),
    __param(0, common_1.Param("teamId")), __param(1, common_1.Param("athleteId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "addAthleteToTeam", null);
__decorate([
    common_1.Delete(":teamId/athletes/:athleteId"),
    __param(0, common_1.Param("teamId")), __param(1, common_1.Param("athleteId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "removeAthleteFromTeam", null);
TeamsController = __decorate([
    common_1.Controller("teams"),
    __metadata("design:paramtypes", [teams_service_1.TeamsService, file_logger_1.FileLogger])
], TeamsController);
exports.TeamsController = TeamsController;
//# sourceMappingURL=teams.controller.js.map