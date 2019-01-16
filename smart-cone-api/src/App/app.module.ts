import { Module } from "@nestjs/common";

// Controllers and services for this module
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";

// Modules which make up our application
import { DatabaseModule } from "../Database/database.module";
import { AuthModule } from "../Auth/auth.module";
import { TeamsModule } from "../Teams/teams.module";
import { UsersModule } from "../Users/users.module";
import { AthletesModule } from "../Athletes/athletes.module";
import { TrainingModule } from "../Training/training.module";
import { LoggerModule } from "../Logging/logger.module";
import { FieldConesModule } from "../FieldCones/field-cones.module";
import { FrontEndCommsModule } from "../FrontEndComms/front-end-comms.module";

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        TeamsModule,
        UsersModule,
        AthletesModule,
        TrainingModule,
        LoggerModule,
        FrontEndCommsModule,
        FieldConesModule,
    ],
    controllers: [AppController, StatusController],
})
export class ApplicationModule {}
