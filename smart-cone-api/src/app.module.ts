import { Module } from "@nestjs/common";

// Controllers and services for this module
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";
import { GeneralSocketApi } from "./general-socket-api";

// Modules which make up our application
import { DatabaseModule } from "./Database/database.module";
import { AuthModule } from "./Auth/auth.module";
import { TeamsModule } from "./Teams/teams.module";
import { UsersModule } from "./Users/users.module";

@Module({
    imports: [DatabaseModule, AuthModule, TeamsModule, UsersModule],
    controllers: [AppController, StatusController],
    components: [GeneralSocketApi],
    modules: [DatabaseModule, AuthModule, TeamsModule, UsersModule]
})
export class ApplicationModule {}
