import { Injectable } from "@nestjs/common";
import * as io from "socket.io-client";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";

@Injectable()
export class CommsService {
    private socket: SocketIOClient.Socket = null;
    constructor() {
        // Create our socket to the smart cone
        this.socket = io(environment.config.getSmartConeApiSocketUrl());
        this.socket.on("connect", () => {
            console.log("Connected to the smart cone!!");
            this.socket.emit("initialContact", "Hello there!");
        });
    }
}
