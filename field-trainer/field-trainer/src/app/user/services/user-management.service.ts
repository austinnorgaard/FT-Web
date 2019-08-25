import { Injectable } from "@angular/core";
import { UserRegistration } from "../../../../../../smart-cone-api/src/Users/user-registration";

import { HttpHelperService } from "../../misc/services/http-helper.service";
import { User } from "../../../../../../smart-cone-api/src/Users/user";

@Injectable()
export class UserManagementService {
    constructor(private http: HttpHelperService) {}

    createUser(user: UserRegistration): Promise<User> {
        return this.http.post<User>("/users", user);
    }
}
