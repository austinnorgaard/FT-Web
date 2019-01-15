import { Injectable } from "@nestjs/common";
import * as io from "socket.io-client";
import * as os from "os";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo } from "../../../smart-cone-api/src/FieldCones/field-cone-info";
import { getFieldConeId, smartConeSocketUrl } from "../utils/environment-helper";

@Injectable()
export class CommsService {
    private socket: SocketIOClient.Socket = null;
    constructor() {
        // Create our socket to the smart cone
        this.socket = io(smartConeSocketUrl, {
            reconnection: true,
            reconnectionDelayMax: 2000,
            randomizationFactor: 0.0,
        });
        console.log(`Setting up socket client with URL ${smartConeSocketUrl}`);
        this.socket.on("connect", async () => {
            console.log("Connected to the smart cone!!");
            const coneInfo = await this.getFieldConeInfo();
            this.socket.emit("initialContact", coneInfo);
        });

        this.socket.on("connect_timeout", () => {
            console.log("Connection_timeout");
        });

        this.socket.on("connect_error", () => {
            console.log("Connect_Error");
        });

        this.socket.on("reconnect", () => {
            console.log("reconnect successfull");
        });

        this.socket.on("reconnect_attempt", () => {
            console.log("reconnect_attempt");
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

        const coneId = await getFieldConeId();
        info.id = coneId;
        return info;
    }
}
