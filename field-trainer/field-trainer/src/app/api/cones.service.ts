import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cone } from '../data/cone';
import { HttpUtil } from '../utility';
import * as config from '../../../global-config';

@Injectable()
export class ConesService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private interval = null;
    private autoRefreshInterval = null;

    constructor(private http: Http) {
        // we are starting fresh, so reset the cones
        // this.refresh();

        // stop in 5 seconds
        this.autoRefreshInterval = setInterval(() => {
            console.log('Stopping refresh.');
            this.stopRefresh();
            clearInterval(this.autoRefreshInterval);
        }, 5000);
    }

    getCones(): Promise<Cone[]> {
        return HttpUtil.get(config.toSmartConeHttp('/get_cones'))
            .then(response => response.cones as Cone[])
            .catch(this.handleError);
    }

    refresh() {
        HttpUtil.get(config.toSmartConeHttp('/reset_cones'))
        .then(function (response) {
            console.log('Reset cones list.');
        }).catch(function(error) {
            console.log('Failed to reset cones list!');
            console.log(error);
        });

        if (this.interval !== null) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            HttpUtil.get(config.toSmartConeHttp('/refresh'))
            .then(function(response) {
            }).catch(function(error) {
                console.log(error);
            });
        }, 2500);
    }

    stopRefresh() {
        clearInterval(this.interval);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
