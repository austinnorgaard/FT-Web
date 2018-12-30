import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { TeamsController } from "./teams.controller";
import { DatabaseModule } from "../Database/database.module";

import * as passport from "passport";

@Module({
    components: [TeamsService],
    controllers: [TeamsController],
    imports: [DatabaseModule],
})
export class TeamsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(passport.authenticate("jwt", { session: false })).forRoutes(TeamsController);
    }
}
