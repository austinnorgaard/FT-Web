import { Injectable } from '@angular/core';
import { Player } from '../data/player';
import { HttpUtil } from '../utility';
import * as config from '../../../../../global-config';

@Injectable()
export class PlayersService {
    constructor() {}

    getPlayers(): Promise<Player[]> {
        return HttpUtil.get(config.toSmartConeHttp('/get_players'))
            .then(response => {
                console.log(response);
            return response.players as Player[]; })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
