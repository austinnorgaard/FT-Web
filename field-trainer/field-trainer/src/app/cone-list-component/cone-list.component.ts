import { Component, OnInit } from "@angular/core";
import { Cone } from "../models/cone";
import { Socket } from "ng-socket-io";
import { ConesService } from "../api/cones.service";

@Component({
    selector: "ft-cone-list",
    templateUrl: "./cone-list.component.html",
    styleUrls: ["./cone-list.component.css"]
})
export class ConeListComponent implements OnInit {
    private refreshInProgress: boolean;
    private interval;
    cones: Cone[];

    ngOnInit(): void {
        this.getCones();

        this.socket.on("cone_added", data => {
            this.getCones();
        });

        this.refreshInProgress = false;
        this.interval = null;
    }

    constructor(private conesService: ConesService, private socket: Socket) {
        this.cones = [];
    }

    getCones(): void {
        this.conesService.getCones().then(cones => {
            console.log(this.cones);
            this.cones = cones;
        });
    }

    conesEmpty(): boolean {
        return this.cones.length === 0;
    }

    refresh() {
        this.refreshInProgress = true;
        console.log("Refresh!");
        this.conesService.refresh();

        // refresh for the next 15 seconds
        if (this.interval !== null) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            console.log("stopping refresh!");
            this.refreshInProgress = false;
            this.conesService.stopRefresh();
        }, 15000);
    }

    refreshing() {
        return this.refreshInProgress;
    }
}
