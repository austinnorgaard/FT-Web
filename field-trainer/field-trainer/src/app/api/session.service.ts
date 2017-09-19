import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { startConeIp } from '../utility';

import 'rxjs/add/operator/toPromise';

import { Cone } from '../data/cone';
import { PlayerSession } from '../data/player-session';

@Injectable()
export class SessionService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = `http://${startConeIp}/get_cones`
    
    constructor(private http: Http) {

    }

    setState(sessions: PlayerSession[]) {
        
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}