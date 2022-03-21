import { Injectable, Inject } from "@nestjs/common";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { Team } from "./team";
import { GetDatabaseResponse } from "../Utility/database-error";
import { AthleteSchema } from "../Database/Models/AthleteSchema";

@Injectable()
export class TeamsService {
    async addTeam(team: Team): Promise<DatabaseResponse> {
        const t = new TeamSchema(team);
        return await this.addTeamToDb(t);
    }

    async removeTeamById(id: number): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            TeamSchema.destroy({
                where: { id },
            })
                .then(res => {
                    const response = new DatabaseResponse(true, `Team ${id} deleted`);
                    resolve(response);
                })
                .catch(err => {
                    const response = new DatabaseResponse(false, `Could not delete team with id ${id}`);
                    reject(response);
                });
        });
    }

    async getTeams(): Promise<Team[]> {
        return TeamSchema.all({
            include: [AthleteSchema],
        });
    }

    async getTeamById(teamId: number): Promise<Team> {
        return TeamSchema.findOne({
            where: {
                id: teamId,
            },
            include: [AthleteSchema],
            rejectOnEmpty: true,
        });
    }

    async addTeamToDb(team: TeamSchema): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            team.save()
                .then(() => {
                    const response = new DatabaseResponse(true, "Team added!");
                    resolve(response);
                })
                .catch(err => {
                    reject(GetDatabaseResponse(err));
                });
        });
    }

    async addAthleteToTeam(teamId: number, athleteId: number): Promise<DatabaseResponse> {
        console.log(`TeamID: ${teamId}, AthleteID: ${athleteId}`);
        // We have an Athlete id and
        return new Promise<DatabaseResponse>((resolve, reject) => {
            TeamSchema.findOne({
                where: {
                    id: teamId,
                },
            })
                .then(team => {
                    // Found our team, lets find our Athlete next
                    AthleteSchema.findOne({
                        where: {
                            id: athleteId,
                        },
                    })
                        .then(athlete => {
                            // found our athlete, add him to the team
                            team.$add("teamAthletes", athlete)
                                .then(response => {
                                    console.log(`Added athlete ${athlete.firstName} ${athlete.lastName} to team ${team.teamName}`);
                                    resolve(new DatabaseResponse(true, "Added athlete to team."));
                                })
                                .catch(err => {
                                    console.log("Failed to add athlete to team.");
                                    reject(GetDatabaseResponse(err));
                                });
                        })
                        .catch(err => {
                            console.log(`Could not find athlete with id ${athleteId}`);
                            reject(GetDatabaseResponse(err));
                        });
                })
                .catch(err => {
                    console.log(`Could not find team with id ${teamId}`);
                    reject(GetDatabaseResponse(err));
                });
        });
    }

    async removeAthleteFromTeam(teamId: number, athleteId: number): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            TeamSchema.findOne({
                where: {
                    id: teamId,
                },
            })
                .then(team => {
                    AthleteSchema.findOne({
                        where: {
                            id: athleteId,
                        },
                    })
                        .then(athlete => {
                            console.log(`Got athlete ${athlete.id} team ${team.id}`);
                            team.$remove("teamAthletes", athlete)
                                .then(response => {
                                    console.log(`Removed athlete ${athlete.firstName} ${athlete.lastName} from team ${team.teamName}`);
                                    resolve(new DatabaseResponse(true, "Removed athlete from team."));
                                })
                                .catch(err => {
                                    console.log("Failed to remove athlete from team.");
                                    console.log(err);
                                    reject(GetDatabaseResponse(err));
                                });
                        })
                        .catch(err => {
                            console.log(`Could not find athlete with id ${athleteId}`);
                            reject(GetDatabaseResponse(err));
                        });
                })
                .catch(err => {
                    console.log(`Could not find team with id ${teamId}`);
                    reject(GetDatabaseResponse(err));
                });
        });
    }
}
