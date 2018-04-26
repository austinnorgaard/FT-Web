import { Component, Inject } from "@nestjs/common";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { Team } from "./Team";
import { DatabaseError } from "../Utility/database-error";
import { AthleteSchema } from "../Database/Models/AthleteSchema";
import { Athlete } from "../Athletes/athlete";

@Component()
export class TeamsService {
    async addTeam(team: Team): Promise<DatabaseResponse> {
        const t = new TeamSchema(team);
        return await this.addTeamToDb(t);
    }

    async getTeams(): Promise<Team[]> {
        return TeamSchema.all({
            include: [AthleteSchema]
        });
    }

    async addTeamToDb(team: TeamSchema): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            team
                .save()
                .then(() => {
                    let response = new DatabaseResponse(true, "Team added!");
                    resolve(response);
                })
                .catch(err => {
                    reject(DatabaseError.GetResponse(err));
                });
        });
    }

    async addAthleteToTeam(team: Team, athlete: Athlete): Promise<DatabaseResponse> {
        // We have an Athlete id and
        return new Promise<DatabaseResponse>((resolve, reject) => {
            TeamSchema.findOne({
                where: {
                    id: team.id
                }
            })
                .then(team => {
                    // Found our team, lets find our Athlete next
                    AthleteSchema.findOne({
                        where: {
                            id: athlete.id
                        }
                    })
                        .then(athlete => {
                            // found our athlete, add him to the team
                            team
                                .$add("teamAthletes", athlete)
                                .then(response => {
                                    console.log(`Added athlete ${athlete.firstName} ${athlete.lastName} to team ${team.teamName}`);
                                })
                                .catch(err => {
                                    console.log("Failed to add athlete to team.");
                                    reject(DatabaseError.GetResponse(err));
                                });
                        })
                        .catch(err => {
                            console.log(`Could not find athlete with id ${athlete.id}`);
                            reject(DatabaseError.GetResponse(err));
                        });
                })
                .catch(err => {
                    console.log(`Could not find team with id ${team.id}`);
                    reject(DatabaseError.GetResponse(err));
                });
        });
    }

    // async test() {
    //     TeamSchema.findOne({
    //         where: {
    //             teamName: "TestTeam2"
    //         }
    //     }).then(team => {
    //         // add an athlete based on a name
    //         AthleteSchema.findOne({
    //             where: {
    //                 firstName: "Keaton"
    //             }
    //         }).then(athlete => {
    //             console.log(`Found: ${athlete.firstName}`);
    //             team.$add("teamAthletes", athlete).then(response => {
    //                 console.log("Success");
    //             });
    //         });
    //     });
    // }
}
