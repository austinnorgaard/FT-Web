import * as jwt from "jsonwebtoken";
import { Component } from "@nestjs/common";
import { FtJwtSecret } from "./ft-jwt";
import { LoginCredentials } from "./login-credentials";
import { JwtToken } from "./jwt-token";
import { UserSchema } from "../Database/Models/UserSchema";
var bcrypt = require("bcrypt");

@Component()
export class AuthService {
    constructor() {}

    generateToken(email: string): JwtToken {
        const expiresIn = 30; // only for testing!
        const jwtUser = { email: email };
        const token = jwt.sign(jwtUser, FtJwtSecret, { expiresIn });
        return new JwtToken(token, expiresIn);
    }

    async login(credentials: LoginCredentials): Promise<JwtToken> {
        try {
            let user = await UserSchema.findOne({ where: { email: credentials.email }, rejectOnEmpty: true });
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
        // good place to check that the token isn't expired
        console.log(signedUser);
        return true;
    }
}
