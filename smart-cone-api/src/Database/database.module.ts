import { Module } from "@nestjs/common";
import { FtSequelize } from "./database.providers";

@Module({
    components: [FtSequelize],
    exports: [FtSequelize],
})
export class DatabaseModule {
    constructor() {
        console.log("Database module loading.");
    }
}
