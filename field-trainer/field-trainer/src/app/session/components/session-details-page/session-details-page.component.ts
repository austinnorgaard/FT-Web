import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";

@Component({
    selector: "ft-session-details-page",
    templateUrl: "./session-details-page.component.html",
    styleUrls: ["./session-details-page.component.css"],
})
export class SessionDetailsPageComponent implements OnInit {
    constructor(private readonly sessionService: SessionService) {
        console.log("SessionDetailsPageComponent!!");
    }

    ngOnInit() {}
}
