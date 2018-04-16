import { Component, OnInit } from "@angular/core";
import { TeamModel } from "../models/team";

@Component({
    selector: "ft-team-management-page",
    templateUrl: "./team-management-page.component.html",
    styleUrls: ["./team-management-page.component.css"]
})
export class TeamManagementPageComponent implements OnInit {
    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    constructor() {}

    ngOnInit() {}
}
