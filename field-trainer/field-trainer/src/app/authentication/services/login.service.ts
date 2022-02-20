import { Injectable } from "@angular/core";
import { LoginCredentials } from "../../../../../../smart-cone-api/src/Auth/login-credentials";
import { JwtToken } from "../../../../../../smart-cone-api/src/Auth/jwt-token";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { HttpErrorResponse } from "@angular/common/http";

export enum LoginResult {
    Unknown, // We haven't added a handler for some edge case, so report Unknown
    Success,
    FailureCredentials, // wrong email/pass
    FailureNetwork, // some network issue, like lack of connectivity
    FailureServer, // Some 5xx error, server didn't give us a logical response
}

@Injectable()
export class LoginService {
    constructor(private http: HttpHelperService) {}

    // Consider Promise<DatabaseResponse> if we ever do more than:
    // true = Logged in, false = email/password wrong (purposefully combining the two)
    async login(credentials: LoginCredentials): Promise<LoginResult> {
        try {
            const response: JwtToken = await this.http.post<JwtToken>("/auth/login", credentials);
            // Save off the JWT Token from the successful login for future requests
            localStorage.setItem("token", response.access_token);
            return LoginResult.Success;
        } catch (err) {
            if (err instanceof HttpErrorResponse) {
                // Identify if this is failed credentials (we don't expose if its user or email specifically)
                // or if this is a network issue/server issue
                if (err.status === 401) {
                    return LoginResult.FailureCredentials;
                } else if (err.status === 0) {
                    // HttpClient docs say this means a client-side or network error
                    return LoginResult.FailureNetwork;
                } else if (err.status >= 500 && err.status < 600) {
                    // Generic 5xx error
                    return LoginResult.FailureServer;
                } else {
                    console.error(`Missing handler for response code ${err.status}`);
                    return LoginResult.Unknown;
                }
            }
        }
    }
}
