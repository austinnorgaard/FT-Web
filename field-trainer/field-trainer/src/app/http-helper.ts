import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpHelper {
    constructor(protected http: Http) {}

    postJson(url: string, data: any): Promise<boolean> {
        return this.http.post(url, data).toPromise().then(res => {
            return res.ok;
        });
    }
}