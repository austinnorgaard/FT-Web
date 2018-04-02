import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserRegistration } from "../../../../../smart-cone-api/src/Users/user-registration";

import * as config from "../../../global-config";
import "rxjs/add/operator/toPromise";

@Injectable()
export class UserManagementService {
    constructor(private http: HttpClient) {}

    createUser(user: UserRegistration): Promise<Object> {
        return this.http
            .post(config.toSmartConeHttp("/users"), user)
            .toPromise();
    }
}
