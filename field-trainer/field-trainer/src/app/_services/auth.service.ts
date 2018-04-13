import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelper) {}

    public isAuthenticated(): boolean {
        const token = localStorage.getItem("token");

        if (token === null) return false;
        console.log(token);

        console.log(this.jwtHelper.getTokenExpirationDate(token));

        return !this.jwtHelper.isTokenExpired(token);
    }
}
