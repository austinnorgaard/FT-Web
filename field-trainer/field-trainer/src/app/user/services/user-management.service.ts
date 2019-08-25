import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserRegistration } from "../../../../../../smart-cone-api/src/Users/user-registration";

import "rxjs/add/operator/toPromise";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { User } from "../../../../../../smart-cone-api/src/Users/user";

@Injectable()
export class UserManagementService {
    constructor(private http: HttpHelperService) {}

    createUser(user: UserRegistration): Promise<User> {
        return this.http.post<User>("/users", user);
    }
}
