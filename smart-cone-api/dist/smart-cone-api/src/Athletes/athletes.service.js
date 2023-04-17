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
const AthleteSchema_1 = require("../Database/Models/AthleteSchema");
const DatabaseResponse_1 = require("../Database/Data/DatabaseResponse");
const TeamSchema_1 = require("../Database/Models/TeamSchema");
const database_error_1 = require("../Utility/database-error");
const file_logger_1 = require("../Logging/file-logger");
let AthletesService = class AthletesService {
    constructor(logger) {
        this.logger = logger;
    }
    async addAthlete(athlete) {
        const a = new AthleteSchema_1.AthleteSchema(athlete);
        return await this.addAthleteToDb(a);
    }
    async getAthletes() {
        return AthleteSchema_1.AthleteSchema.all({
            include: [TeamSchema_1.TeamSchema],
        });
    }
    async getAthlete(id) {
        return AthleteSchema_1.AthleteSchema.findById(id);
    }
    async removeAthleteById(id) {
        return new Promise((resolve, reject) => {
            AthleteSchema_1.AthleteSchema.destroy({
                where: { id },
            })
                .then(res => {
                const response = new DatabaseResponse_1.DatabaseResponse(true, `Athlete id ${id} deleted`);
                resolve(response);
            })
                .catch(err => {
                const response = new DatabaseResponse_1.DatabaseResponse(false, `Could not delete athlete with id ${id}`);
                reject(response);
            });
        });
    }
    async addAthleteToDb(athlete) {
        return new Promise((resolve, reject) => {
            athlete
                .save()
                .then(createdAthlete => {
                this.logger.log(JSON.stringify(createdAthlete));
                const response = new DatabaseResponse_1.DatabaseResponse(true, "Athlete added!", null, {
                    athleteId: createdAthlete.id,
                });
                resolve(response);
            })
                .catch(err => {
                reject(database_error_1.GetDatabaseResponse(err));
            });
        });
    }
};
AthletesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_logger_1.FileLogger])
], AthletesService);
exports.AthletesService = AthletesService;
//# sourceMappingURL=athletes.service.js.map