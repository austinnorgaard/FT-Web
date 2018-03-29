import * as jwt from "jsonwebtoken";
import { Component } from "@nestjs/common";
import { FtJwtSecret } from "./ft-jwt";
import { LoginCredentials } from "./login-credentials";
import { User } from "../Database/Models/User";
import { JwtToken } from "./jwt-token";
var bcrypt = require("bcrypt");

@Component()
export class AuthService {
    constructor() {}

    // async createToken(userEmail: string) {
    //     const expiresIn = 60 * 60; // expressed in seconds, 1 hour
    //     const jwtUser = { email: userEmail };
    //     const token = jwt.sign(jwtUser, FtJwtSecret, { expiresIn });
    //     return {
    //         expires_in: expiresIn,
    //         access_token: token
    //     };
    // }

    generateToken(email: string): JwtToken {
        const expiresIn = 60 * 60 * 24; // only for testing!
        const jwtUser = { email: email };
        const token = jwt.sign(jwtUser, FtJwtSecret, { expiresIn });
        return new JwtToken(token, expiresIn);
    }

    async login(credentials: LoginCredentials): Promise<JwtToken> {
        try {
            let user = await User.findOne({ where: { email: credentials.email }, rejectOnEmpty: true });
            console.log("Found user.");

            // Take the passed in password, hash it, then compare to the hash on the user we retrieved
            let result = await bcrypt.compare(credentials.password, user.passwordHash);

            if (result) {
                return this.generateToken(user.email);
            } else {
                throw Error("Email or password incorrect");
            }
        } catch (e) {
            throw Error("Email or password incorrect");
        }
    }

    async validateUser(signedUser): Promise<boolean> {
        console.log("validating user!");
        // What is validateUser used for? Additional check?
        return true;
    }
}
