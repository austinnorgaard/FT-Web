import { Injectable } from '@angular/core';
import { Player } from '../data/player';
import { startConeIp } from '../utility';
import { Headers, Http } from '@angular/http';

@Injectable()
export class PlayersService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = `http://${startConeIp}/get_players`;

    constructor(private http: Http) {}

    getPlayers(): Promise<Player[]> {
        console.log("URL: " + this.url);
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().players as Player[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
