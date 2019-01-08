import { Module } from "@nestjs/common";

// Controllers and services for this module
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";
import { GeneralSocketApi } from "./general-socket-api";

// Modules which make up our application
import { DatabaseModule } from "../Database/database.module";
import { AuthModule } from "../Auth/auth.module";
import { TeamsModule } from "../Teams/teams.module";
import { UsersModule } from "../Users/users.module";
import { AthletesModule } from "../Athletes/athletes.module";
import { TrainingModule } from "../Training/training.module";
import { LoggerModule } from "../Logging/logger.module";
import { FieldConesModule } from "../FieldCones/field-cones.module";

@Module({
    imports: [DatabaseModule, AuthModule, TeamsModule, UsersModule, AthletesModule, TrainingModule, LoggerModule, FieldConesModule],
    controllers: [AppController, StatusController],
    providers: [GeneralSocketApi],
})
export class ApplicationModule {}
