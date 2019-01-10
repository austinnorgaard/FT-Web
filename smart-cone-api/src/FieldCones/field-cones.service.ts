import { Injectable } from "@nestjs/common";
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FieldConeInfo } from "./field-cone-info";
import { Observable, Subject } from "rxjs";

@Injectable()
@WebSocketGateway(parseInt(environment.config.coneApiSocketPort, 10))
export class FieldConesService implements OnGatewayConnection, OnGatewayDisconnect {
    public onConnectSubject: Subject<FieldConeInfo> = new Subject<FieldConeInfo>();
    constructor() {
        console.log("Field Cones Service instantiated!");
        this.onConnectSubject.subscribe({
            next: cone => {
                console.log(`Received new cone data! ${JSON.stringify(cone)}`);
            },
        });
    }

    handleConnection(client: any, ...args: any[]) {
        console.log("Gateway connect!");
    }

    handleDisconnect(client: any) {
        console.log("Gateway disconnect!");
    }

    // This is called when a field cone connects to us, they will identify themselves
    // along with any information we may need from them up front
    @SubscribeMessage("initialContact")
    onInitialContact(client, data: FieldConeInfo) {
        console.log(`Contacted by a field cone! Their info, cone ID: ${data.id} at ${data.ip}`);
        this.onConnectSubject.next(data);
    }
    initialConnection() {}
}
