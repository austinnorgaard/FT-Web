import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { DatabaseModule } from "../Database/database.module";

@Module({
    components: [UsersService],
    controllers: [UsersController],
    imports: [DatabaseModule],
})
export class UsersModule {
    constructor() {}
}
