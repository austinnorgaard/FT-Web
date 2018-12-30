import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../Database/database.module";

@Module({
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [DatabaseModule],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
