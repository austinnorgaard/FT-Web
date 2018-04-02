import { User } from "./user";

// Refers to the data which is sent to register a new user
// Contains the regular user data, along with the password they selected
export abstract class UserRegistration {
    user: User;
    password: string;
}
