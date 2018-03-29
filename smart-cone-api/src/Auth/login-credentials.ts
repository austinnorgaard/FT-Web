import { IsString } from "class-validator";

// Represents the credentials being passed to backend to try to authenticate
export abstract class LoginCredentials {
    @IsString() email: string;
    @IsString() password: string;
}
