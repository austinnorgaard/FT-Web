import { WebSocketGateway, WsResponse, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { FT_CONFIG } from "../../../field-trainer/field-trainer/global-config";
import { GatewayMetadataExplorer } from "@nestjs/websockets/gateway-metadata-explorer";

@WebSocketGateway(parseInt(FT_CONFIG.smartConeApiSocketPort))
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
