import { Injectable } from "@nestjs/common";
import * as io from "socket.io-client";
import * as os from "os";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo } from "../../../smart-cone-api/src/FieldCones/field-cone-info";

@Injectable()
export class CommsService {
    private socket: SocketIOClient.Socket = null;
    constructor() {
        // Create our socket to the smart cone
        this.socket = io(environment.config.getConeApiSocketUrl());
        this.socket.on("connect", () => {
            console.log("Connected to the smart cone!!");
            const interfaces = os.networkInterfaces();
            console.log(interfaces);
            this.socket.emit("initialContact", this.getFieldConeInfo());
        });
    }

    getFieldConeInfo(): FieldConeInfo {
        const interfaces = os.networkInterfaces();
        const info: FieldConeInfo = { ip: "unknown", id: 0 };

        if (Object.keys(interfaces).some(k => k === "Wi-Fi")) {
            console.log("We are on windows!");
            info.ip = interfaces["Wi-Fi"].filter(i => i.family === "IPv4")[0].address;
        } else if (Object.keys(interfaces).some(k => k === "wlan0")) {
            console.log("We are on Linux!!");
            info.ip = interfaces.wlan0.filter(i => i.family === "IPv4")[0].address;
        }

        return info;
    }
}
