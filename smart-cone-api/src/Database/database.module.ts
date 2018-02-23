import { Module } from "@nestjs/common";
import { DatabaseComponent } from "./database.component";
import { UsersController } from "./users.controller";

@Module({
    components: [DatabaseComponent],
    controllers: [UsersController]
})
export class DatabaseModule {}
