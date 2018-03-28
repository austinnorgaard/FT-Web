import { Module } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { TeamsController } from "./teams.controller";
import { DatabaseModule } from "../Database/database.module";

@Module({
    components: [TeamsService],
    controllers: [TeamsController],
    imports: [DatabaseModule]
})
export class TeamsModule {
    constructor() {
        console.log("initializing teams module");
    }
}
