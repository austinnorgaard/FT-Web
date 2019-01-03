import { Component, OnInit, Input } from "@angular/core";
import { AthleteSession } from "../../models/athlete-session";

@Component({
    selector: "ft-athlete-overview",
    templateUrl: "./athlete-overview.component.html",
    styleUrls: ["./athlete-overview.component.css"],
})
export class AthleteOverviewComponent implements OnInit {
    @Input() public athleteSession: AthleteSession;
    @Input() public maxCones: number;

    constructor() {}

    ngOnInit() {}
}
