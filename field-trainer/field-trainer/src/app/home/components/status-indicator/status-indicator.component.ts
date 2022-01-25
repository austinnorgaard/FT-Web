import { Component, OnInit } from "@angular/core";
import { SocketMessageBrokerService } from "../../../socket-message-broker/socket-message-broker.service";

@Component({
    selector: "ft-status-indicator",
    templateUrl: "./status-indicator.component.html",
    styleUrls: ["./status-indicator.component.css"],
})
export class StatusIndicatorComponent implements OnInit {
    private connected: Boolean;

    constructor(private broker: SocketMessageBrokerService) {
        // Start out assuming we are not connected
        this.connected = false;

        this.broker.broker.RegisterEventObservable("connect").subscribe(data => {
            this.connected = true;
            //this.broker.getSocket().emit("SetTime", new Date());
        });

        this.broker.broker.RegisterEventObservable("disconnect").subscribe(data => {
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
