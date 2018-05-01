import { WebSocketGateway, WsResponse, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";

@WebSocketGateway()
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
