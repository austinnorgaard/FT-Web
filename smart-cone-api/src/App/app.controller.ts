import { Get, Controller, Post } from "@nestjs/common";

import * as child_process from "child_process";
import * as fs from "fs";

@Controller()
export class AppController {
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
}
