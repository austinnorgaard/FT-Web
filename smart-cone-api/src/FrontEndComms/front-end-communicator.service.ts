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

        // Start tracking the field cones as they are connected
        this.fieldConesService.connectedFieldCones.subscribe(cones => {
            console.log(`New update for the connected field cones. Count = ${cones.length}`);

            // Let the frontend know, but only if we are connected to the front end at this point in time
            if (this.frontEndSocket !== null) {
                console.log("Updating frontend of the new cone which connected or disconnected");
                this.frontEndSocket.emit("fieldConesConnected", cones);
            } else {
                console.log("Not able to notify the frontend of the new cone count, because we are not connected.");
            }
        });
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Connection received from Front End.`);

        // now that we are connected with the front end, we will want to keep track
        // of the socket
        this.frontEndSocket = client;

        // re-emit the current values
        this.fieldConesService.connectedFieldCones.next(this.fieldConesService.connectedFieldCones.getValue());
    }

    handleDisconnect(client: any) {
        this.logger.log(`Disconnection received from Front End.`);

        this.frontEndSocket = null;
    }

    @SubscribeMessage("test")
    onTest(client, data): WsResponse<any> {
        const event = "test";
        return { event, data };
    }
}
