import * as jwt from "jsonwebtoken";
import { Component } from "@nestjs/common";
import { FtJwtSecret } from "./ft-jwt";

@Component()
export class AuthService {
    constructor() {}

    async createToken(userEmail: string) {
        const expiresIn = 60 * 60; // expressed in seconds, 1 hour
        const jwtUser = { email: userEmail };
        const token = jwt.sign(jwtUser, FtJwtSecret, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        console.log("validating user!");
        // What is validateUser used for? Additional check?
        return true;
    }
}