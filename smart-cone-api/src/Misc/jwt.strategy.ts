import * as passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Component, Inject } from "@nestjs/common";
import { AuthService } from "../Services/auth.service";
import { FtJwtSecret } from "./ft-jwt";

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: FtJwtSecret
            },
            async (req, payload, next) => await this.verify(req, payload, next)
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        console.log("req");
        console.log(req);
        console.log("payload");
        console.log(payload);
        //const isValid = await this.authService.validateUser(payload);
        const isValid = true;
        if (!isValid) {
            return done("Unauthorized", false);
        }
        done(null, payload);
    }
}
