import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.providers";
import { UsersController } from "../Controllers/users.controller";
import { TeamsController } from "../Controllers/teams.controller";
import { UsersService } from "../Services/users.service";
import { TeamsService } from "../Services/teams.service";
import { ftProviders } from "./providers";

@Module({
    components: [...databaseProviders, UsersService, TeamsService, ...ftProviders],
    exports: [...databaseProviders, ...ftProviders, UsersService, TeamsService],
    controllers: [UsersController, TeamsController]
})
export class DatabaseModule {}
