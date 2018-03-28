import { Module } from "@nestjs/common";
import { FtSequelize } from "./database.providers";
import { UsersController } from "../Users/users.controller";
import { UsersService } from "../Users/users.service";
import { ftProviders } from "./providers";

@Module({
    components: [FtSequelize, UsersService],
    exports: [FtSequelize, UsersService],
    controllers: [UsersController]
})
export class DatabaseModule {
    constructor() {
        console.log("Database module loading.");
    }
}
