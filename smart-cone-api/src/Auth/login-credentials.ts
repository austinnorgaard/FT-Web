import { IsString } from "../../../field-trainer/field-trainer/node_modules/class-validator";

// Represents the credentials being passed to backend to try to authenticate
export abstract class LoginCredentials {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @IsString() email: string;
    @IsString() password: string;

    isValid(): boolean {
        // return false if the fields are undefined or empty
        return this.email !== undefined && this.email.length !== 0 && this.password !== undefined && this.password.length !== 0;
    }
}
