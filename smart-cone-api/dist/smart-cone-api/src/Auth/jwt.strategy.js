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
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const ft_jwt_1 = require("./ft-jwt");
const file_logger_1 = require("../Logging/file-logger");
let JwtStrategy = class JwtStrategy extends passport_jwt_1.Strategy {
    constructor(authService, fileLogger) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: ft_jwt_1.FtJwtSecret,
        }, async (req, payload, next) => await this.verify(req, payload, next));
        this.authService = authService;
        this.fileLogger = fileLogger;
        passport.use(this);
        this.fileLogger.log("JWT Initialized");
    }
    async verify(req, payload, done) {
        const isValid = await this.authService.validateUser(payload);
        if (!isValid) {
            return done("Unauthorized", false);
        }
        done(null, payload);
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, file_logger_1.FileLogger])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map