import { Injectable } from "@angular/core";
import { LoginCredentials } from "../../../../../../smart-cone-api/src/Auth/login-credentials";
import { JwtToken } from "../../../../../../smart-cone-api/src/Auth/jwt-token";
import { HttpHelperService } from "../../misc/services/http-helper.service";

@Injectable()
export class LoginService {
    constructor(private http: HttpHelperService) {}

    // Consider Promise<DatabaseResponse> if we ever do more than:
    // true = Logged in, false = email/password wrong (purposefully combining the two)
    async login(credentials: LoginCredentials): Promise<string> {
        try {
            const response: JwtToken = await this.http.post<JwtToken>("/auth/login", credentials);
            localStorage.setItem("token", response.access_token);
            return "Success";
        } catch (err) {
            console.log(`Login error: ${JSON.stringify(err)}`);
            throw err;
        }
    }
}
