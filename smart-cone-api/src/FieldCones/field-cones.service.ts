import { Injectable } from "@nestjs/common";
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo } from "./field-cone-info";
import { Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable()
@WebSocketGateway(parseInt(environment.config.coneApiSocketPort, 10))
export class FieldConesService implements OnGatewayConnection, OnGatewayDisconnect {
    public onConnectSubject: Subject<FieldConeInfo> = new Subject<FieldConeInfo>();
    public connectedFieldCones: BehaviorSubject<FieldConeInfo[]> = new BehaviorSubject<FieldConeInfo[]>([]);
    public onTilt: Subject<FieldConeInfo> = new Subject<FieldConeInfo>();

    constructor() {
        console.log("Field Cones Service instantiated!");
        this.onConnectSubject.subscribe({
            next: cone => {
                console.log(`Received new cone data! ${JSON.stringify(cone)}`);

                const value = this.connectedFieldCones.getValue();
                value.push(cone);
                this.connectedFieldCones.next(value);
            },
        });
    }

    handleConnection(client: any, ...args: any[]) {
        console.log(`Gateway connect from client id ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log(`Gateway disconnect for client id ${client.id}`);

        // remove the cone from the cone list based on the session id
        let value = this.connectedFieldCones.getValue();
        value = value.filter(v => v.sessionId !== client.id);
        this.connectedFieldCones.next(value);
    }

    // This is called when a field cone connects to us, they will identify themselves
    // along with any information we may need from them up front
    @SubscribeMessage("initialContact")
    onInitialContact(client, data: FieldConeInfo) {
        console.log(`Contacted by a field cone! Their info, cone ID: ${data.id} at ${data.ip}`);
        this.onConnectSubject.next({ id: data.id, ip: data.ip, sessionId: client.id } as FieldConeInfo);
    }

    @SubscribeMessage("tiltOccurred")
    onTiltEvent(client, data: any) {
        console.log("on tilt event!");
        // data is nothing
        // Figure out which cone from the client id
        const cone = this.connectedFieldCones.getValue().find(c => c.sessionId === client.id);
        this.onTilt.next(cone);
    }
}
