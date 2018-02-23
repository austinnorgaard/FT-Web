import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserData } from "../../../../../smart-cone-api/src/Database/Data/UserData";

import * as config from "../../../global-config";
import "rxjs/add/operator/toPromise";

@Injectable()
export class UserManagementService {
    constructor(private http: HttpClient) {}

    createUser(user: UserData): Promise<Object> {
        return this.http
            .post(config.toSmartConeHttp("/users"), user)
            .toPromise();
    }
}
