import * as passport from "passport";
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../Database/database.module";

@Module({
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [DatabaseModule]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        console.log("auth module configuring");
        // consumer
        //     .apply(passport.authenticate("jwt", { session: false }))
        //     //.forRoutes({ path: "/auth/authorized", method: RequestMethod.ALL });
        //     .forRoutes({ path: "/auth/authorized", method: RequestMethod.ALL }, UsersController);
    }
}
