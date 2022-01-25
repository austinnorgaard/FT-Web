import { Injectable } from "@angular/core";
import { SocketMessageBroker } from "./socket-message-broker";
//import { Socket } from "ngx-socket-io";
import { MessageBroker } from "./message-broker";

@Injectable({ providedIn: "root" })
export class SocketMessageBrokerService {
    public broker: MessageBroker;

    // REMOVE ME. SOCKET BROKER NEEDS TX SUPPORT
    //private _socket: Socket;

    constructor() {
        //this._socket = socket;
        this.broker = new SocketMessageBroker<any>(null);
    }

    /*public getSocket(): Socket {
        //return this._socket;
    }*/
}
