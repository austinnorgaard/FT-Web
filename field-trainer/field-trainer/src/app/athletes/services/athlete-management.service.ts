import { Injectable } from "@angular/core";
import { AthleteRegistration } from "../../../../../../smart-cone-api/src/Athletes/athlete-registration";
import { DatabaseResponse } from "../../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { HttpHelperService } from "../../misc/services/http-helper.service";

@Injectable()
export class AthleteManagementService {
    constructor(private http: HttpHelperService) {}

    async createAthlete(athleteRegistration: AthleteRegistration): Promise<DatabaseResponse> {
        try {
            return this.http.post<DatabaseResponse>("/athletes", athleteRegistration);
        } catch (err) {
            throw err;
        }
    }

    async getAthletes(): Promise<Athlete[]> {
        try {
            return await this.http.get<Athlete[]>("/athletes");
        } catch (err) {
            throw err;
        }
    }

    async removeAthlete(id: number): Promise<DatabaseResponse> {
        try {
            return await this.http.delete(`/athletes/${id}`);
        } catch (err) {
            throw err;
        }
    }
}
