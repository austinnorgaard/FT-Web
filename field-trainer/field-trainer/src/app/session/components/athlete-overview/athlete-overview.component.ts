import { Component, OnInit, Input } from "@angular/core";
import { AthleteSession } from "../../../../../../../smart-cone-api/src/Training/athlete-session";
@Component({
    selector: "ft-athlete-overview",
    templateUrl: "./athlete-overview.component.html",
    styleUrls: ["./athlete-overview.component.css"],
})
export class AthleteOverviewComponent implements OnInit {
    @Input() public athleteSession: AthleteSession;

    constructor() {}

    ngOnInit() {}

    getNumCompleted(): number {
        return this.athleteSession.segments.filter(segment => segment.completed).length;
    }

    getTotalSegments(): number {
        return this.athleteSession.segments.length;
    }

    public onClick() {
        console.log(
            `Need to route to session details for athlete: ${this.athleteSession.athlete.id}. Current # segments: ${
                this.athleteSession.segments.filter(s => s.completed).length
            }`,
        );
    }
}
