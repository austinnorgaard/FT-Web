import { Injectable } from "@nestjs/common";
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";

@Injectable()
@WebSocketGateway(4556)
export class FieldConesService implements OnGatewayConnection, OnGatewayDisconnect {
    constructor() {
        console.log("Field Cones Service instantiated!");
    }
    handleConnection(client: any, ...args: any[]) {
        console.log("Gateway connect!");
    }
    handleDisconnect(client: any) {
        console.log("Gateway disconnect!");
    }
}
