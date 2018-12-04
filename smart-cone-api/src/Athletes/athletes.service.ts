import { Component } from "@nestjs/common";
import { AthleteSchema } from "../Database/Models/AthleteSchema";
import { Athlete } from "./athlete";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { GetDatabaseResponse } from "../Utility/database-error";

@Component()
export class AthletesService {
    async addAthlete(athlete: Athlete): Promise<DatabaseResponse> {
        const a = new AthleteSchema(athlete);
        return await this.addAthleteToDb(a);
    }

    async getAthletes(): Promise<Athlete[]> {
        return AthleteSchema.all({
            include: [TeamSchema],
        });
    }

    async getAthlete(id: number): Promise<Athlete> {
        return AthleteSchema.findById(id);
    }

    async removeAthleteById(id: number): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            AthleteSchema.destroy({
                where: { id },
            })
                .then(res => {
                    const response = new DatabaseResponse(true, `Athlete id ${id} deleted`);
                    resolve(response);
                })
                .catch(err => {
                    const response = new DatabaseResponse(false, `Could not delete athlete with id ${id}`);
                    reject(response);
                });
        });
    }

    private async addAthleteToDb(athlete: AthleteSchema): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            athlete
                .save()
                .then(createdAthlete => {
                    console.log(createdAthlete);
                    // success
                    const response = new DatabaseResponse(true, "Athlete added!", null, {
                        athleteId: createdAthlete.id, // allow caller to get at the created athlete
                    });
                    resolve(response);
                })
                .catch(err => {
                    reject(GetDatabaseResponse(err));
                });
        });
    }
}
