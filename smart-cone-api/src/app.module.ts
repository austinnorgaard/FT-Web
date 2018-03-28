import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";
import { GeneralSocketApi } from "./general-socket-api";
import { UsersController } from "./Controllers/users.controller";
import { TeamsController } from "./Controllers/teams.controller";
import { DatabaseModule } from "./Database/database.module";

import { UsersService } from "./Services/users.service";
import { TeamsService } from "./Services/teams.service";
import { ftProviders } from "./Database/providers";
import { AuthModule } from "./Auth/auth.module";

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AppController, StatusController],
    components: [GeneralSocketApi],
    modules: [DatabaseModule, AuthModule]
})
export class ApplicationModule {}
