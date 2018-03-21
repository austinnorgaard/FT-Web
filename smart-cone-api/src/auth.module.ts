import * as passport from "passport";
import { Module, NestModule, MiddlewaresConsumer, RequestMethod, forwardRef } from "@nestjs/common";
import { AuthService } from "./Services/auth.service";
import { JwtStrategy } from "./Misc/jwt.strategy";
import { AuthController } from "./Controllers/auth.controller";
import { UsersService } from "./Services/users.service";
import { DatabaseModule } from "./Database/database.module";
import { ftProviders } from "./Database/providers";
import { UsersController } from "./Controllers/users.controller";

@Module({
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [DatabaseModule]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate("jwt", { session: false }))
            //.forRoutes({ path: "/auth/authorized", method: RequestMethod.ALL });
            .forRoutes(AuthController, UsersController);
    }
}
