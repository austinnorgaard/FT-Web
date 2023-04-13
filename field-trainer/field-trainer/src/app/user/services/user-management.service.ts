import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserRegistration } from "../../../../../../smart-cone-api/src/Users/user-registration";

import "rxjs/add/operator/toPromise";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { User } from "../../../../../../smart-cone-api/src/Users/user";

export enum CreateUserResult {
    Unknown,
    Success,
    FailureConstraintViolation, // For now we just assume email constraint violation only
    FailureNetwork, // Some network/client issue
    FailureServer, // Some 5xx error
}

@Injectable()
export class UserManagementService {
    constructor(private http: HttpHelperService) {}

    async createUser(user: UserRegistration): Promise<CreateUserResult> {
        try {
            // Server expects a flat object, so decompose the nested
            // user fields
            await this.http.post<User>("/user", {
                password: user.password,
                user: user.user
            });
            return CreateUserResult.Success;
        } catch (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    return CreateUserResult.FailureConstraintViolation;
                } else if (err.status === 0) {
                    // HttpClient docs say this means a client-side or network error
                    return CreateUserResult.FailureNetwork;
                } else if (err.status >= 500 && err.status < 600) {
                    // Generic 5xx error
                    return CreateUserResult.FailureServer;
                } else {
                    console.error(`Missing handler for response code ${err.status}`);
                    return CreateUserResult.Unknown;
                }
            } else {
                console.error("Got a non-http error from an HttpClient function?");
                return CreateUserResult.Unknown;
            }
        }
    }
}
