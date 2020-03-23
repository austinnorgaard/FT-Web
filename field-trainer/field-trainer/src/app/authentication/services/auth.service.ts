import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) {}

    public isAuthenticated(): boolean {
	    return true
        const token = localStorage.getItem("token");

        if (token === null) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(token);
    }
}
