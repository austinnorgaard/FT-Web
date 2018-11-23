import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LoginCredentials } from "../../../../../../smart-cone-api/src/Auth/login-credentials";
import { JwtToken } from "../../../../../../smart-cone-api/src/Auth/jwt-token";

import { FT_CONFIG } from "../../../../global-config";

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    // Consider Promise<DatabaseResponse> if we ever do more than:
    // true = Logged in, false = email/password wrong (purposefully combining the two)
    login(credentials: LoginCredentials): Promise<string> {
        return this.http
            .post<JwtToken>(FT_CONFIG.toSmartConeHttp("/auth/login"), credentials)
            .toPromise()
            .then(response => {
                localStorage.setItem("token", response.access_token);
                return Promise.resolve("Success");
            })
            .catch(err => {
                console.log("error??", err);
                return Promise.reject(err);
            });
    }
}
