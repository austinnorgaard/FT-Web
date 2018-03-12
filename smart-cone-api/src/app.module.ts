import { Module } from "@nestjs/common";
import { AppController } from "./Controllers/app.controller";
import { StatusController } from "./Controllers/status.controller";
import { GeneralSocketApi } from "./general-socket-api";
import { UsersController } from "./Controllers/users.controller";
import { TeamsController } from "./Controllers/teams.controller";
import { DatabaseModule } from "./Database/database.module";

import { UsersService } from "./Services/users.service";
import { TeamsService } from "./Services/teams.service";
import { ftProviders } from "./Database/providers";

@Module({
    imports: [DatabaseModule],
    controllers: [AppController, StatusController, UsersController, TeamsController],
    components: [GeneralSocketApi, UsersService, ...ftProviders, TeamsService],
    modules: [DatabaseModule]
})
export class ApplicationModule {}
