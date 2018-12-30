import * as passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Component, Inject, LoggerService } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FtJwtSecret } from "./ft-jwt";
import { FileLogger } from "../Logging/file-logger";

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService, private readonly fileLogger: FileLogger) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: FtJwtSecret,
            },
            async (req, payload, next) => await this.verify(req, payload, next),
        );
        passport.use(this);
        this.fileLogger.log("JWT Initialized");
    }

    public async verify(req, payload, done) {
        const isValid = await this.authService.validateUser(payload);
        if (!isValid) {
            return done("Unauthorized", false);
        }
        done(null, payload);
    }
}
