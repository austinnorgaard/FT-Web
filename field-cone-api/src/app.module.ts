import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommsModule } from "./Comms/comms.module";

import * as util from "util";
import * as fs from "fs";
import { getFieldConeId } from "utils/environment-helper";
import { environment } from "../../field-trainer/field-trainer/src/environments/environment";

const readFile = util.promisify(fs.readFile);

@Module({
    imports: [CommsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements OnModuleInit {
    constructor() {}

    async onModuleInit() {
        const id = await getFieldConeId();
        console.log(
            `App module loaded -- Environment information
Cone ID: ${id}
Smart Cone Socket API URL: ${environment.config.getSmartConeApiSocketUrl()}`,
        );
    }
}
