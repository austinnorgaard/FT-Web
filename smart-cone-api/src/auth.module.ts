import * as passport from "passport";
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { AuthService } from "./Services/auth.service";
import { JwtStrategy } from "./Misc/jwt.strategy";
import { AuthController } from "./Controllers/auth.controller";
import { UsersService } from "./Services/users.service";
import { DatabaseModule } from "./Database/database.module";
import { ftProviders } from "./Database/providers";
import { UsersController } from "./Controllers/users.controller";
import { TeamsController } from "./Controllers/teams.controller";

@Module({
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [DatabaseModule]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        console.log("auth module configuring");
        consumer
            .apply(passport.authenticate("jwt", { session: false }))
            //.forRoutes({ path: "/auth/authorized", method: RequestMethod.ALL });
            .forRoutes({ path: "/auth/authorized", method: RequestMethod.ALL }, UsersController, TeamsController);
    }
}
