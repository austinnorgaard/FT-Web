import { Component, OnInit } from "@angular/core";
import { Socket } from "ng-socket-io";

@Component({
    selector: "ft-status-indicator",
    templateUrl: "./status-indicator.component.html",
    styleUrls: ["./status-indicator.component.css"]
})
export class StatusIndicatorComponent implements OnInit {
    private connected: Boolean;

    constructor(private socket: Socket) {
        // Start out assuming we are not connected
        this.connected = false;

        this.socket.on("connect", () => {
            // We've received a connection from the smart-cone, set our
            // indicator to on
            this.connected = true;
        });

        this.socket.on("disconnect", () => {
            // We've received a disconnect from the smart-cone, set our
            // indicator to off
            this.connected = false;
        });
    }

    ngOnInit() {}

    getIcon(): String {
        if (this.connected) {
            return "check";
        } else {
            return "close";
        }
    }

    getColor(): String {
        if (this.connected) {
            return "lightgreen";
        } else {
            return "red";
        }
    }

    getTooltip(): String {
        if (this.connected) {
            return "Connected to back end!";
        } else {
            return "Not connected to back end!";
        }
    }
}
