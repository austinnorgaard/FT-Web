import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../../../global-config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerSessionService {
    constructor(private http: HttpClient) {

    }

    public startSession(uuid: string) {
        // start a session for a player referenced by uuid
        return this.http.post(config.toSmartConeHttp("/player_start"), {uuid: uuid})
            .toPromise();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
