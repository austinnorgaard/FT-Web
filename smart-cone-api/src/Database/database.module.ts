import { Module } from "@nestjs/common";
import { DatabaseComponent } from "./database.component";
import { UsersController } from "./users.controller";
import { TeamsController } from "./teams.controller";

@Module({
    components: [DatabaseComponent],
    controllers: [UsersController, TeamsController]
})
export class DatabaseModule {}
