import { AthletesController } from "./athletes.controller";
import { DatabaseModule } from "../Database/database.module";
import { Module, NestModule, MiddlewaresConsumer } from "@nestjs/common";

import * as passport from "passport";
import { AthletesService } from "./athletes.service";
import { TeamsService } from "../Teams/teams.service";

@Module({
    components: [AthletesService, TeamsService],
    controllers: [AthletesController],
    imports: [DatabaseModule],
})
export class AthletesModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
        console.log("Athletes Module configuring");
        consumer.apply(passport.authenticate("jwt", { session: false })).forRoutes(AthletesController);
    }
}
