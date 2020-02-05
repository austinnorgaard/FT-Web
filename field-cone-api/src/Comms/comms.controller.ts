import { Controller, Post, Body, Get } from "@nestjs/common";

import * as fs from "fs";
import * as util from "util";
import * as child_process from "child_process";
import { CommsService } from "./comms.service";

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export class SetIdDto {
    id: number;
}

@Controller("comms")
export class CommsController {
    constructor(private commsService: CommsService) {}

    @Post("id")
    public async setId(@Body() newId: SetIdDto) {
        // User passes in the new cone ID in body
        console.log(`Setting this cone's ID to ${newId.id}`);

        // Open the /var/tmp/.cone-id file, write the new value ignoring the previous
        await writeFile("/var/tmp/.cone-id", newId.id.toString());

        await this.commsService.updateConeInfo();
    }

    @Get("id")
    public async getId() {
        return parseInt((await readFile("/var/tmp/.cone-id")).toString());
    }

    @Post("update")
    public async update() {
        // Write a file indicating this is an initiated update
        fs.writeFileSync("/var/tmp/.initiated-update", "true");
        child_process.exec("sudo rm /var/tmp/ft_update_lock");
        // Reboot into the regular wifi mode, updates are handled automatically at that point
        child_process.exec("/usr/bin/switch_to_regular_wifi.sh");
    }
}
