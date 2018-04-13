import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LoginCredentials } from "../../../../../smart-cone-api/src/Auth/login-credentials";
import { JwtToken } from "../../../../../smart-cone-api/src/Auth/jwt-token";

import * as config from "../../../global-config";

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    // Consider Promise<DatabaseResponse> if we ever do more than:
    // true = Logged in, false = email/password wrong (purposefully combining the two)
    login(credentials: LoginCredentials): Promise<boolean> {
        return this.http
            .post<JwtToken>(config.toSmartConeHttp("/auth/login"), credentials)
            .toPromise()
            .then(response => {
                localStorage.setItem("token", response.access_token);
                return Promise.resolve(true);
            })
            .catch(err => {
                console.log(err);
                return Promise.resolve(false);
            });
    }
}
