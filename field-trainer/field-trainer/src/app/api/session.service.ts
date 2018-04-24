import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Cone } from "../models/cone";
import { PlayerSession } from "../models/player-session";

import "rxjs/add/operator/toPromise";

@Injectable()
export class SessionService {
    constructor(private http: Http) {}

    setState(sessions: PlayerSession[]) {}

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
