import { Get, Controller, Post } from "@nestjs/common";

import * as child_process from "child_process";
import * as fs from "fs";
import { AppService, SmartConeInfo } from "./app.service";
//import { getSmartConeInfo } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {

    }

    @Get()
    root(): string {
        return "Root Path";
    }

    @Post("update")
    updateSelf() {
        console.log("Updating self!");
        child_process.exec("sudo rm /var/tmp/ft_update_lock");
        fs.writeFileSync("/var/tmp/.initiated-update", "true");
        child_process.exec("sudo /usr/bin/switch_to_regular_wifi.sh");
    }

    @Get("info")
    async getPackages(): Promise<SmartConeInfo> {
        // returns the currently installed ft-update packages and their versions
        return await this.appService.getSmartConeInfo();
    }
}
