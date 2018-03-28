import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";
import { GeneralSocketApi } from "./general-socket-api";
import { UsersController } from "./Users/users.controller";
import { DatabaseModule } from "./Database/database.module";

import { UsersService } from "./Users/users.service";
import { ftProviders } from "./Database/providers";
import { AuthModule } from "./Auth/auth.module";
import { TeamsModule } from "./Teams/teams.module";

@Module({
    imports: [DatabaseModule, AuthModule, TeamsModule],
    controllers: [AppController, StatusController],
    components: [GeneralSocketApi],
    modules: [DatabaseModule, AuthModule, TeamsModule]
})
export class ApplicationModule {}
