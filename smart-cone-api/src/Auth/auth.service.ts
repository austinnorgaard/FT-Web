import * as jwt from "jsonwebtoken";
import { Injectable } from "@nestjs/common";
import { FtJwtSecret } from "./ft-jwt";
import { LoginCredentials } from "./login-credentials";
import { JwtToken } from "./jwt-token";
import { UserSchema } from "../Database/Models/UserSchema";
const bcrypt = require("bcryptjs"); // ts-lint

@Injectable()
export class AuthService {
    constructor() {}

    generateToken(email: string): JwtToken {
        const expiresIn = 60 * 60 * 24; // only for testing!
        const jwtUser = { email };
        const token = jwt.sign(jwtUser, FtJwtSecret, { expiresIn });
        return new JwtToken(token, expiresIn);
    }

    async login(credentials: LoginCredentials): Promise<JwtToken> {
        const user = await UserSchema.findOne({ where: { email: credentials.email } });
        if (!user) {
            throw new EmailNotFoundError("Email not found");
        }

        // Take the passed in password, hash it, then compare to the hash on the user we retrieved
        const result = await bcrypt.compare(credentials.password, user.passwordHash);

        if (result) {
            return this.generateToken(user.email);
        } else {
            throw new PasswordIncorrectError("Password incorrect");
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
