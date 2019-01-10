import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";

@WebSocketGateway(parseInt(environment.config.coneApiSocketPort, 10))
export class CommsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor() {
        console.log("CommsGateway constructing..");
    }

    handleConnection(client: any, ...args: any[]) {
        console.log("Connected! Client: " + JSON.stringify(client));
        console.log(`Args: ${JSON.stringify(args)}`);
    }

    handleDisconnect(client: any) {
        console.log("Disconnected! Client: " + JSON.stringify(client));
    }
}
