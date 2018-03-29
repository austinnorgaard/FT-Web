import { IsString } from "class-validator";

// Represents the credentials being passed to backend to try to authenticate
export abstract class LoginCredentials {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @IsString() email: string;
    @IsString() password: string;
}
