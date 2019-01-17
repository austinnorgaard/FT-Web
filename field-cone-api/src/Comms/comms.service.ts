import { Injectable } from "@nestjs/common";
import * as io from "socket.io-client";
import * as os from "os";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo } from "../../../smart-cone-api/src/FieldCones/field-cone-info";
import { getFieldConeId, smartConeSocketUrl } from "../utils/environment-helper";
import { BaseTiltService } from "Tilt/base-tilt-service";

@Injectable()
export class CommsService {
    private socket: SocketIOClient.Socket;
    constructor(private readonly tiltService: BaseTiltService) {
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

        this.tiltService.TiltOccured.subscribe(() => {
            console.log("A tilt occurred!");
        });
    }

    async getFieldConeInfo(): Promise<FieldConeInfo> {
        const interfaces = os.networkInterfaces();
        const info = { ip: "unknown", id: -1 } as any;

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
