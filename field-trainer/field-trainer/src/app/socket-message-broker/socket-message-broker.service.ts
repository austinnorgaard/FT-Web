import { Injectable } from "@angular/core";
import { SocketMessageBroker } from "./socket-message-broker";
import { Socket } from "ngx-socket-io";

@Injectable({ providedIn: "root" })
export class SocketMessageBrokerService {
    public broker: SocketMessageBroker<Socket>;

    constructor(private socket: Socket) {
        this.broker = new SocketMessageBroker<Socket>(socket);
    }
}
