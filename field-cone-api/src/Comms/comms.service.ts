import { Injectable } from "@nestjs/common";
import * as io from "socket.io-client";
import * as os from "os";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo } from "../../../smart-cone-api/src/FieldCones/field-cone-info";

import * as fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

@Injectable()
export class CommsService {
    private socket: SocketIOClient.Socket = null;
    constructor() {
        // Create our socket to the smart cone
        this.socket = io(environment.config.getConeApiSocketUrl());
        this.socket.on("connect", async () => {
            console.log("Connected to the smart cone!!");
            const coneInfo = await this.getFieldConeInfo();
            this.socket.emit("initialContact", coneInfo);
        });
    }

    async getFieldConeInfo(): Promise<FieldConeInfo> {
        const interfaces = os.networkInterfaces();
        const info: FieldConeInfo = { ip: "unknown", id: -1 };

        if (Object.keys(interfaces).some(k => k === "Wi-Fi")) {
            console.log("We are on windows!");
            info.ip = interfaces["Wi-Fi"].filter(i => i.family === "IPv4")[0].address;
        } else if (Object.keys(interfaces).some(k => k === "wlan0")) {
            console.log("We are on Linux!!");
            info.ip = interfaces.wlan0.filter(i => i.family === "IPv4")[0].address;
        }

        const coneId = await this.getFieldConeId();
        info.id = coneId;
        return info;
    }

    async getFieldConeId(): Promise<number> {
        // The field-cone ID is stored at /var/tmp/.cone-id if the device has been bootstrapped
        // otherwise, we can just return -1 as an obvious indicator of an invalid ID
        try {
            const data = await readFile("/var/tmp/.cone-id");
            return parseInt(data.toString("ascii"), 10);
        } catch (err) {
            return -1;
        }
    }
}
