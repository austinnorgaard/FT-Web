import { Component, OnInit } from "@angular/core";
import { SocketMessageBrokerService } from "../../../socket-message-broker/socket-message-broker.service";
import { IsNumber } from "class-validator";

export class Blah {
    @IsNumber() id: number;
}

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

        // Use the broker
        // we don't care about the actual return value
        this.broker.broker.RegisterEventObservable("connect", Blah).subscribe(data => {
            this.connected = true;
        });
        this.broker.broker.RegisterEventObservable("disconnect", Blah).subscribe(data => {
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
