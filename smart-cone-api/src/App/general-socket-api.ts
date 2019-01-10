import { WebSocketGateway, WsResponse, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { GatewayMetadataExplorer } from "@nestjs/websockets/gateway-metadata-explorer";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FileLogger } from "../Logging/file-logger";
import { inspect } from "util";

@WebSocketGateway(parseInt(environment.config.smartConeApiSocketPort, 10))
export class GeneralSocketApi implements OnGatewayConnection, OnGatewayDisconnect {
    public constructor(private readonly logger: FileLogger) {
        this.logger.log("Enabling Websocket Gateway!");
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Connection received. Data: ${inspect(client)}`);
        this.logger.log(`Num args: ${args.length} ${JSON.stringify(args)}`);
    }

    handleDisconnect(client: any) {
        this.logger.log(`Disconnection received. Data: ${client}`);
    }

    @SubscribeMessage("test")
    onTest(client, data): WsResponse<any> {
        const event = "test";
        return { event, data };
    }
}
