import { Component } from "@nestjs/common";
import { AthleteSchema } from "../Database/Models/AthleteSchema";
import { Athlete } from "./athlete";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { GetDatabaseResponse } from "../Utility/database-error";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";

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
