import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpHelper {
    constructor(protected http: HttpClient) {}

    postJson(url: string, data: any): Promise<boolean> {
        return this.http
            .post(url, data)
            .toPromise()
            .then(res => {
                return true;
            });
    }
}
