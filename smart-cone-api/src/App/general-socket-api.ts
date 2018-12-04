import { WebSocketGateway, WsResponse, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { GatewayMetadataExplorer } from "@nestjs/websockets/gateway-metadata-explorer";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";

@WebSocketGateway(parseInt(environment.config.smartConeApiSocketPort))
export class GeneralSocketApi implements OnGatewayConnection, OnGatewayDisconnect {
    handleConnection(client: any) {
        console.log(`Connection received. Data: ${client}`);
    }

    handleDisconnect(client: any) {
        console.log(`Disconnection received. Data: ${client}`);
    }

    @SubscribeMessage("test")
    onTest(client, data): WsResponse<any> {
        const event = "test";
        return { event, data };
    }
}
