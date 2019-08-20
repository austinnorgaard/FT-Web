import { Controller, Post, Body, Get } from "@nestjs/common";

import * as fs from "fs";
import * as util from "util";

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export class SetIdDto {
    id: number;
}

@Controller("comms")
export class CommsController {
    @Post("id")
    public async setId(@Body() newId: SetIdDto) {
        // User passes in the new cone ID in body
        console.log(`Setting this cone's ID to ${newId.id}`);

        // Open the /var/tmp/.cone-id file, write the new value ignoring the previous
        await writeFile("/var/tmp/.cone-id", newId.id.toString());
    }

    @Get("id")
    public async getId() {
        parseInt;
        return parseInt((await readFile("/var/tmp/.cone-id")).toString());
    }
}
