import { Component } from "@nestjs/common";
import { AthleteSchema } from "../Database/Models/AthleteSchema";
import { Athlete } from "./athlete";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseError } from "../Utility/database-error";
import { TeamSchema } from "../Database/Models/TeamSchema";

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
                .then(() => {
                    // success
                    let response = new DatabaseResponse(true, "Athlete added!");
                    resolve(response);
                })
                .catch(err => {
                    reject(DatabaseError.GetResponse(err));
                });
        });
    }
}
