import * as jwt from "jsonwebtoken";
import { Component } from "@nestjs/common";
import { FtJwtSecret } from "./ft-jwt";
import { LoginCredentials } from "./login-credentials";
import { JwtToken } from "./jwt-token";
import { UserSchema } from "../Database/Models/UserSchema";
const bcrypt = require("bcrypt"); // ts-lint

@Component()
export class AuthService {
    constructor() {}

    generateToken(email: string): JwtToken {
        const expiresIn = 60 * 60 * 24; // only for testing!
        const jwtUser = { email };
        const token = jwt.sign(jwtUser, FtJwtSecret, { expiresIn });
        return new JwtToken(token, expiresIn);
    }

    async login(credentials: LoginCredentials): Promise<JwtToken> {
        try {
            const user = await UserSchema.findOne({ where: { email: credentials.email }, rejectOnEmpty: true });
            console.log("Found user.");

            // Take the passed in password, hash it, then compare to the hash on the user we retrieved
            const result = await bcrypt.compare(credentials.password, user.passwordHash);

            if (result) {
                return this.generateToken(user.email);
            } else {
                throw new PasswordIncorrectError("Password incorrect");
            }
        } catch (e) {
            throw new EmailNotFoundError("Email not found");
        }
    }

    async validateUser(signedUser): Promise<boolean> {
        return true;
    }
}

export class EmailNotFoundError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class PasswordIncorrectError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
