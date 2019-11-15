import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";

@Component({
    selector: "ft-result-page",
    templateUrl: "./result-page.component.html",
    styleUrls: ["./result-page.component.css"],
})
export class ResultPageComponent implements OnInit {
    constructor(private readonly sessionService: SessionService) {}

    async onSaveResults() {
        console.log("Saving results in backend");
        await this.sessionService.saveResults();
        console.log("Saved");
    }

    ngOnInit() {}
}
