import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";

@Component({
    selector: "ft-finished-result-page",
    templateUrl: "./finished-result-page.component.html",
    styleUrls: ["./finished-result-page.component.css"],
})
export class FinishedResultPageComponent implements OnInit {
    constructor(public readonly sessionService: SessionService) {}

    async onSaveResults() {
        console.log("Saving results in backend");
        await this.sessionService.saveResults();
        console.log("Saved");
    }

    ngOnInit() {}
}