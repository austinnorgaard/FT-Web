"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const TeamSchema_1 = require("../Database/Models/TeamSchema");
const DatabaseResponse_1 = require("../Database/Data/DatabaseResponse");
const database_error_1 = require("../Utility/database-error");
const AthleteSchema_1 = require("../Database/Models/AthleteSchema");
let TeamsService = class TeamsService {
    async addTeam(team) {
        const t = new TeamSchema_1.TeamSchema(team);
        return await this.addTeamToDb(t);
    }
    async getTeams() {
        return TeamSchema_1.TeamSchema.all({
            include: [AthleteSchema_1.AthleteSchema],
        });
    }
    async getTeamById(teamId) {
        return TeamSchema_1.TeamSchema.findOne({
            where: {
                id: teamId,
            },
            include: [AthleteSchema_1.AthleteSchema],
            rejectOnEmpty: true,
        });
    }
    async addTeamToDb(team) {
        return new Promise((resolve, reject) => {
            team.save()
                .then(() => {
                const response = new DatabaseResponse_1.DatabaseResponse(true, "Team added!");
                resolve(response);
            })
                .catch(err => {
                reject(database_error_1.GetDatabaseResponse(err));
            });
        });
    }
    async addAthleteToTeam(teamId, athleteId) {
        console.log(`TeamID: ${teamId}, AthleteID: ${athleteId}`);
        return new Promise((resolve, reject) => {
            TeamSchema_1.TeamSchema.findOne({
                where: {
                    id: teamId,
                },
            })
                .then(team => {
                AthleteSchema_1.AthleteSchema.findOne({
                    where: {
                        id: athleteId,
                    },
                })
                    .then(athlete => {
                    team.$add("teamAthletes", athlete)
                        .then(response => {
                        console.log(`Added athlete ${athlete.firstName} ${athlete.lastName} to team ${team.teamName}`);
                        resolve(new DatabaseResponse_1.DatabaseResponse(true, "Added athlete to team."));
                    })
                        .catch(err => {
                        console.log("Failed to add athlete to team.");
                        reject(database_error_1.GetDatabaseResponse(err));
                    });
                })
                    .catch(err => {
                    console.log(`Could not find athlete with id ${athleteId}`);
                    reject(database_error_1.GetDatabaseResponse(err));
                });
            })
                .catch(err => {
                console.log(`Could not find team with id ${teamId}`);
                reject(database_error_1.GetDatabaseResponse(err));
            });
        });
    }
    async removeAthleteFromTeam(teamId, athleteId) {
        return new Promise((resolve, reject) => {
            TeamSchema_1.TeamSchema.findOne({
                where: {
                    id: teamId,
                },
            })
                .then(team => {
                AthleteSchema_1.AthleteSchema.findOne({
                    where: {
                        id: athleteId,
                    },
                })
                    .then(athlete => {
                    console.log(`Got athlete ${athlete.id} team ${team.id}`);
                    team.$remove("teamAthletes", athlete)
                        .then(response => {
                        console.log(`Removed athlete ${athlete.firstName} ${athlete.lastName} from team ${team.teamName}`);
                        resolve(new DatabaseResponse_1.DatabaseResponse(true, "Removed athlete from team."));
                    })
                        .catch(err => {
                        console.log("Failed to remove athlete from team.");
                        console.log(err);
                        reject(database_error_1.GetDatabaseResponse(err));
                    });
                })
                    .catch(err => {
                    console.log(`Could not find athlete with id ${athleteId}`);
                    reject(database_error_1.GetDatabaseResponse(err));
                });
            })
                .catch(err => {
                console.log(`Could not find team with id ${teamId}`);
                reject(database_error_1.GetDatabaseResponse(err));
            });
        });
    }
};
TeamsService = __decorate([
    common_1.Injectable()
], TeamsService);
exports.TeamsService = TeamsService;
//# sourceMappingURL=teams.service.js.map