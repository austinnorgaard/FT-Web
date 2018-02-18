import { Injectable } from "@angular/core";
import { Player } from "../data/player";
import { HttpUtil } from "../utility";
import { HttpClient } from "@angular/common/http";

import * as config from "../../../global-config";
import "rxjs/add/operator/toPromise";

@Injectable()
export class PlayersService {
    constructor(private http: HttpClient) {}

    getPlayers(): Promise<Player[]> {
        return HttpUtil.get(config.toSmartConeHttp("/get_players"))
            .then(response => {
                return response.players as Player[];
            })
            .catch(this.handleError);
    }

    addPlayer(name: string): Promise<void> {
        return this.http
            .post(config.toSmartConeHttp("/add_player"), { name: name })
            .toPromise()
            .then(response => {});
    }

    removePlayer(name: string): Promise<void> {
        return this.http
            .post(config.toSmartConeHttp("/remove_player"), { name: name })
            .toPromise()
            .then(response => {});
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
