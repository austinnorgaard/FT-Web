import { Module } from "@nestjs/common";
import { FtSequelize } from "./database.providers";
import { MockFtSequelize } from "./mock-database.providers";
import * as fs from "fs";

function isReal(): boolean {
    try {
        fs.readFileSync("/var/tmp/field-trainer-db.db");
        return true;
    } catch (err) {
        return false;
    }
}
@Module({
    imports: [],
    exports: [FtSequelize],
    providers: [isReal() ? MockFtSequelize : FtSequelize]
})
export class DatabaseModule {
    constructor() {}
}
