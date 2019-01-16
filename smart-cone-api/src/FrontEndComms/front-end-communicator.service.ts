import { WebSocketGateway, WsResponse, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { FileLogger } from "../Logging/file-logger";
import { Injectable } from "@nestjs/common";
import { FieldConesService } from "../FieldCones/field-cones.service";

@WebSocketGateway(parseInt(environment.config.smartConeApiSocketPort, 10))
@Injectable()
export class FrontEndCommunicator implements OnGatewayConnection, OnGatewayDisconnect {
    frontEndSocket: any = null;

    public constructor(private readonly logger: FileLogger, private readonly fieldConesService: FieldConesService) {
        this.logger.log("Enabling Websocket Gateway!");
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Connection received from Front End.`);

        // now that we are connected with the front end, we will want to keep track
        // of the socket
        this.frontEndSocket = client;

        // Start tracking the field cones as they are connected
        this.fieldConesService.connectedFieldCones.subscribe(cones => {
            console.log(`New update for the connected field cones. Count = ${cones.length}`);

            // Let the frontend know!
        });
    }

    handleDisconnect(client: any) {
        this.logger.log(`Disconnection received from Front End.`);
    }

    @SubscribeMessage("test")
    onTest(client, data): WsResponse<any> {
        const event = "test";
        return { event, data };
    }
}
