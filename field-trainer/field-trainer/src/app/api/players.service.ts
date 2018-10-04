import { Injectable } from "@angular/core";
import { Player } from "../models/player";
import { HttpClient } from "@angular/common/http";
import { FT_CONFIG } from "../../../global-config";

import "rxjs/add/operator/toPromise";

@Injectable()
export class PlayersService {
    constructor(private http: HttpClient) {}

    getPlayers(): Promise<Player[]> {
        return this.http
            .get(FT_CONFIG.toSmartConeHttp("/get_players"))
            .toPromise()
            .then(response => {
                return response as Player[];
            })
            .catch(this.handleError);
    }

    addPlayer(name: string): Promise<void> {
        return this.http
            .post(FT_CONFIG.toSmartConeHttp("/add_player"), { name: name })
            .toPromise()
            .then(response => {});
    }

    removePlayer(name: string): Promise<void> {
        return this.http
            .post(FT_CONFIG.toSmartConeHttp("/remove_player"), { name: name })
            .toPromise()
            .then(response => {});
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
