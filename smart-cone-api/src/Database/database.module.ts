import { Module } from "@nestjs/common";
import { FtSequelize } from "./database.providers";

@Module({
    providers: [FtSequelize],
    exports: [FtSequelize],
})
export class DatabaseModule {
    constructor() {}
}
