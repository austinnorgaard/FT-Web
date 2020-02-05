import { Injectable } from "@nestjs/common";
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo, FieldConeClient } from "./field-cone-info";
import { Observable, Subject, BehaviorSubject, identity } from "rxjs";
import { PING_DATA } from "./ping-data";
import { WifiSettingsService } from "../Wifi/wifi.service";

@Injectable()
@WebSocketGateway(parseInt(environment.config.coneApiSocketPort, 10))
export class FieldConesService implements OnGatewayConnection, OnGatewayDisconnect {
    public onConnectSubject: Subject<FieldConeInfo> = new Subject<FieldConeInfo>();
    public connectedFieldCones: BehaviorSubject<FieldConeInfo[]> = new BehaviorSubject<FieldConeInfo[]>([]);
    public onTilt: Subject<FieldConeInfo> = new Subject<FieldConeInfo>();

    private clients: Array<FieldConeClient> = [];

    constructor(private wifiService: WifiSettingsService) {
        console.log("Field Cones Service instantiated!");
        this.onConnectSubject.subscribe({
            next: cone => {
                console.log(`Received new cone data! ConeID: ${cone.id}. Session ID: ${cone.sessionId}. IP: ${cone.ip}`);

                // Check if we already have a cone, and throw up a warning if we do
                if (this.connectedFieldCones.getValue().some(item => item.id === cone.id)) {
                    console.log(`WARNING: Cone ${cone.id} is already in our Field Cones list!`);
                }

                cone.latencyStartTime = new Date();

                const value = this.connectedFieldCones.getValue();
                value.push(cone);
                this.connectedFieldCones.next(value);

                const client = this.clients.find(c => c.id === cone.id);
                if (client === null || client === undefined) {
                    console.log(`COULD NOT FIND SOCKET IO CLIENT FOR CONE ID ${cone.id}! THIS IS BAD`);
                    return;
                }
                // Send a message to the field-cone, initiating sync
                client.client.emit("FieldConePing", PING_DATA);
            },
        });

        this.wifiService.getWifiSettingsObservable().subscribe(wifiSettings => {
            // the official wifi settings have changed, update all currently connected field
            // cones with the update
            this.connectedFieldCones.getValue().forEach(cone => {
                const client = this.getFieldConeSocketClient(cone.id);
                if (client) {
                    client.client.emit("SetWifiSettings", {
                        settings: wifiSettings,
                    });
                } else {
                    console.log(`Could not get field cone id for cone id: ${cone.id}`);
                }
            });
        });
    }

    handleConnection(client: any, ...args: any[]) {
        console.log(`Gateway connect from client id ${client.id}.`);

        console.log(`Using a ping data size of ${PING_DATA.length}`);
    }

    handleDisconnect(client: any) {
        console.log(`Gateway disconnect for client id ${client.id}`);

        // remove the cone from the cone list based on the session id
        let value = this.connectedFieldCones.getValue();
        value = value.filter(v => v.sessionId !== client.id);
        this.connectedFieldCones.next(value);
    }

    // TODO: Can I fix the `any` here? Need socket.io types
    public getFieldConeSocketClient(id: number): any {
        const client = this.clients.find(c => c.id === id);
        if (client) {
            return client;
        }

        // TODO: Should we just assert/blowup here?
        return undefined;
    }

    // This is called when a field cone connects to us, they will identify themselves
    // along with any information we may need from them up front
    @SubscribeMessage("initialContact")
    onInitialContact(client, data: FieldConeInfo) {
        console.log(`Contacted by a field cone! Their info, cone ID: ${data.id} at ${data.ip}`);

        const _ourClient = this.clients.find(c => c.id === data.id);
        if (_ourClient === null || _ourClient === undefined) {
            // This is fine, just add a new mapping
            this.clients.push({
                id: data.id,
                client: client,
            } as FieldConeClient);
        } else {
            _ourClient.client = client;
        }

        // Update their wifi settings with our master list
        client.emit("InitializeWifiSettings", this.wifiService.getWifiSettings());

        this.onConnectSubject.next({ id: data.id, ip: data.ip, sessionId: client.id, latencyResults: [] } as FieldConeInfo);
    }

    @SubscribeMessage("tiltOccurred")
    onTiltEvent(client, data: any) {
        console.log("on tilt event!");
        if (client === undefined || client === null) {
            console.log("Client information is not valid.");
            return;
        }
        // data is nothing
        // Figure out which cone from the client id
        const cone = this.connectedFieldCones.getValue().find(c => c.sessionId === client.id);
        if (cone !== undefined && cone !== null) {
            this.onTilt.next(cone);
        }
    }

    @SubscribeMessage("coneChanged")
    onConeUpdated(client, data: FieldConeInfo) {
        let coneArray = this.connectedFieldCones.getValue();
        let extractedCone = coneArray.find(cone => cone.sessionId === client.id);
        let extractedConeId = coneArray.findIndex(cone => cone.sessionId === client.id);

        extractedCone.id = data.id;
        extractedCone.ip = data.ip;
        coneArray[extractedConeId];
        this.connectedFieldCones.next(coneArray);
    }

    @SubscribeMessage("FieldConePingResponse")
    onFieldConePingResponse(client, data: any) {
        const currentTime = new Date();
        // Identify the field cone
        let fieldCones = this.connectedFieldCones.getValue();
        let fieldCone = fieldCones.find(f => f.sessionId === client.id);
        if (fieldCone === undefined || fieldCone === null) {
            console.log(`WARN!! Got a Field Cone Ping for a cone which we don't know about!!`);
            return;
        }

        fieldCone.latencyResults.push(currentTime.getTime() - fieldCone.latencyStartTime.getTime());
        this.connectedFieldCones.next(fieldCones);

        setTimeout(() => {
            fieldCone.latencyStartTime = new Date();
            client.emit("FieldConePing", "HELLO");
        }, 3000);
    }
}
