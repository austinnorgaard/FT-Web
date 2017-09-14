import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { startConeIp } from '../utility';

import 'rxjs/add/operator/toPromise';

import { Cone } from '../data/cone';

@Injectable()
export class ConesService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = `http://${startConeIp}/get_cones`

    constructor(private http: Http) {

    }

    getCones(): Promise<Cone[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().cones as Cone[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}