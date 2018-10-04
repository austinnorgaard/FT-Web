import { Injectable, OnInit } from "@angular/core";
import { Cone } from "../models/cone";
import { FT_CONFIG } from "../../../global-config";

import "rxjs/add/operator/toPromise";
import { HttpClient } from "@angular/common/http";
//import { toPromise } from 'rxjs/operators';

@Injectable()
export class ConesService {
    private interval = null;
    private autoRefreshInterval = null;

    constructor(private http: HttpClient) {
        // we are starting fresh, so reset the cones
        // this.refresh();

        // stop in 5 seconds
        this.autoRefreshInterval = setInterval(() => {
            console.log("Stopping refresh.");
            this.stopRefresh();
            clearInterval(this.autoRefreshInterval);
        }, 5000);
    }

    getCones(): Promise<Cone[]> {
        return this.http.get<Cone[]>(FT_CONFIG.toSmartConeHttp("/get_cones")).toPromise();
    }

    refresh() {
        this.http
            .get(FT_CONFIG.toSmartConeHttp("/reset_cones"))
            .toPromise()
            .then(function(response) {
                console.log("Reset cones list.");
            })
            .catch(function(error) {
                console.log("Failed to reset cones list!");
                console.log(error);
            });

        if (this.interval !== null) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            this.http
                .get(FT_CONFIG.toSmartConeHttp("/refresh"))
                .toPromise()
                .then(function(response) {})
                .catch(function(error) {
                    console.log(error);
                });
        }, 2500);
    }

    stopRefresh() {
        clearInterval(this.interval);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
