"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const ft_jwt_1 = require("./ft-jwt");
const jwt_token_1 = require("./jwt-token");
const UserSchema_1 = require("../Database/Models/UserSchema");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor() { }
    generateToken(email) {
        const expiresIn = 60 * 60 * 24;
        const jwtUser = { email };
        const token = jwt.sign(jwtUser, ft_jwt_1.FtJwtSecret, { expiresIn });
        return new jwt_token_1.JwtToken(token, expiresIn);
    }
    async login(credentials) {
        const user = await UserSchema_1.UserSchema.findOne({ where: { email: credentials.email } });
        if (!user) {
            throw new EmailNotFoundError("Email not found");
        }
        const result = await bcrypt.compare(credentials.password, user.passwordHash);
        if (result) {
            return this.generateToken(user.email);
        }
        else {
            throw new PasswordIncorrectError("Password incorrect");
        }
    }
    async validateUser(signedUser) {
        return true;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
class EmailNotFoundError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.EmailNotFoundError = EmailNotFoundError;
class PasswordIncorrectError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.PasswordIncorrectError = PasswordIncorrectError;
//# sourceMappingURL=auth.service.js.map