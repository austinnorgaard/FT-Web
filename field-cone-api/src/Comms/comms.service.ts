import { Injectable } from "@nestjs/common";
import * as io from "socket.io-client";
import * as os from "os";
import * as child_process from "child_process";
import * as fs from "fs";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo, BuildsJsonFormat } from "../../../smart-cone-api/src/FieldCones/field-cone-info";
import { getFieldConeId, smartConeSocketUrl } from "../utils/environment-helper";
import { BaseTiltService } from "../Tilt/base-tilt-service";
import { WifiSetting } from "../Wifi/wifi.service";
import { BaseWifiService } from "../Wifi/base-wifi.service";
import { BaseTimeSyncService } from "./base-time-sync.service";

@Injectable()
export class CommsService {
    private socket: SocketIOClient.Socket;
    constructor(private readonly tiltService: BaseTiltService, private readonly wifiService: BaseWifiService,
        private readonly timeService: BaseTimeSyncService) {
        // Create our socket to the smart cone
        this.socket = io(smartConeSocketUrl(), {
            reconnection: true,
            reconnectionDelayMax: 2000,
            randomizationFactor: 0.0,
        });
        console.log(`Setting up socket client with URL ${smartConeSocketUrl()}`);
        this.socket.on("connect", async () => {
            console.log("Connected to the smart cone!!");
            const coneInfo = await this.getFieldConeWrapper();

            this.socket.emit("initialContact", coneInfo);
        });

        this.tiltService.TiltOccured.subscribe(() => {
            console.log("A tilt occurred!");

            // need to emit an event back to the smart cone that a tilt occur
            // TODO: Does the smart cone have all the info it needs for when tilts are emitted??
            this.socket.emit("tiltOccurred", {});
        });

        this.socket.on("FieldConePing", async () => {
            this.socket.emit("FieldConePingResponse", {});
        });

        this.socket.on("EnableTilts", () => {
            console.log("Enabling tilts...");
            this.tiltService.setTiltsEnabled(true);
        });

        this.socket.on("DisableTilts", () => {
            console.log("Disabling tilts...");
            this.tiltService.setTiltsEnabled(false);
        });

        this.socket.on("SetWifiSettings", wifiSettings => {
            // wifiSetting is an object with keys ssid and password
            this.wifiService.initializeWifiSettings(wifiSettings);
        });

        this.socket.on("InitialWifiSettings", (wifiSettings: Array<WifiSetting>) => {
            // list of objects with keys ssid and password
            // This is the "master" list from the smart cone
            this.wifiService.initializeWifiSettings(wifiSettings);
        });

        this.socket.on("SetTime", (time: Date) => {
            this.timeService.SetTime(time);
        });
    }

    async updateConeInfo() {
        // Read the current cone state and emit it, so the smart cone
        // can be notified of changes
        this.socket.emit("coneChanged", await this.getFieldConeWrapper());
    }

    async getFieldConeWrapper(): Promise<FieldConeInfo> {
        while (true) {
            console.log("Trying to get field info (IP)");
            try {
                return await this.getFieldConeInfo();
            } catch (ex) {
                console.log(`Failed, toggling bat0 interface and retrying DHCP. Error: ${ex}`);
                child_process.execSync("sudo ifconfig bat0 down");
                child_process.execSync("sudo ifconfig bat0 up");
                child_process.execSync("sudo dhclient bat0");
                // Try again
                // 5 second wait
                await this.sleep(5000);
            }
        }
    }

    async getFieldConeInfo(): Promise<FieldConeInfo> {
        const interfaces = os.networkInterfaces();
        const info = {
            ip: "unknown",
            id: -1,
            version: {
                fieldCone: -1,
                fieldConeSystem: -1,
                audioFiles: -1,
            },
        } as any;
        console.log(Object.keys(interfaces));
        if (Object.keys(interfaces).some(k => k.includes("Wi-Fi"))) {
            console.log("We are on windows!");
            // find that key which contains WiFi
            const wifiKey = Object.keys(interfaces).find(k => k.includes("Wi-Fi"));
            info.ip = interfaces[wifiKey].filter(i => i.family === "IPv4")[0].address;
            console.log(info.ip);
        } else if (Object.keys(interfaces).some(k => k === "bat0")) {
            console.log("We are on the Raspberry Pi (detected B.A.T.M.A.N.)");
            info.ip = interfaces.bat0.filter(i => i.family === "IPv4")[0].address;
            if (info.ip.startsWith("169")) {
                throw `Invalid IP received! IP: ${info.ip}`;
            }
        } else if (Object.keys(interfaces).some(k => k.includes("wlx"))) {
            /*console.log("We are on a Linux desktop system!");
            let test = Object.keys(interfaces).filter(i => i.includes("wlx"));
            console.log(interfaces[test[0]].filter(i => i.family === "IPv4")[0].address);*/
            console.log("Assuming we are on a dev machine");
            info.ip = "127.0.0.1";
        } else {
            // Just assume we are running on a desktop development machine as that
            // is the most likely case
            console.log("Assuming we are on a dev machine");
            info.ip = "127.0.0.1";
        }

        const coneId = await getFieldConeId();
        info.id = coneId;

        // If we are on a dev machine, hard-code the versions instead of querying them as they will not exist
        if (info.ip === "127.0.0.1") {
            info.version.fieldCone = 123;
            info.version.fieldConeSystem = 123;
            info.version.audioFiles = 123;
            return info;
        }

        // Grab the current versions of software on this cone
        const buildsStr = fs.readFileSync("/var/tmp/builds.json").toString();
        const builds = JSON.parse(buildsStr) as BuildsJsonFormat;

        // for now, hard-coded to just pull out the ones we need
        builds.packages.forEach(p => {
            if (p.name === "field-cone") {
                info.version.fieldCone = p.version;
            } else if (p.name === "field-cone-system") {
                info.version.fieldConeSystem = p.version;
            } else if (p.name === "audio-files") {
                info.version.audioFiles = p.version;
            } else {
                console.log(`WARN: Found a package which we aren't tracking. Name: ${p.name}, Version: ${p.version}`);
            }
        });

        return info;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
