import { Injectable } from "@angular/core";
import { SocketMessageBroker } from "./socket-message-broker";
import { Socket } from "ngx-socket-io";
import { MessageBroker } from "./message-broker";

@Injectable({ providedIn: "root" })
export class SocketMessageBrokerService {
    public broker: MessageBroker;

    constructor(private socket: Socket) {
        this.broker = new SocketMessageBroker<Socket>(this.socket);
    }
}
