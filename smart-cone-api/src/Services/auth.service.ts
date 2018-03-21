import * as jwt from "jsonwebtoken";
import { Component } from "@nestjs/common";
import { FtJwtSecret } from "../Misc/ft-jwt";
import { User } from "../Database/Models/User";
import { UsersService } from "./users.service";

@Component()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async createToken(userEmail: string) {
        const expiresIn = 60 * 60; // expressed in seconds, 1 hour
        const jwtUser = { email: userEmail };
        const token = jwt.sign(jwtUser, FtJwtSecret, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token
        };
    }

    async validateUser(email: string, password: string): Promise<boolean> {
        // ask database if this email/password combination is correct
        //return this.usersService.validateCredentials(email, password);
        return true;
    }
}
