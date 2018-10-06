import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TeamModel } from "../models/team";
import { TeamManagementService } from "../api/team-management.service";
import { AthleteManagementService } from "../api/athlete-management.service";

@Component({
    selector: "ft-athlete-select",
    templateUrl: "./athlete-select.component.html",
    styleUrls: ["./athlete-select.component.css"],
})
export class AthleteSelectComponent implements OnInit {
    protected selectedTeam: TeamModel;
    protected availableTeams: TeamModel[];
    constructor(private router: Router, private teamsService: TeamManagementService, private athletesService: AthleteManagementService) {
        this.loadAvailableTeams();
    }

    ngOnInit() {}

    onClick() {
        this.router.navigateByUrl("/session-setup/field-select");
    }

    onTeamChanged() {
        console.log("Team changed!");
    }

    loadAvailableTeams() {
        this.teamsService
            .getTeams()
            .then(teams => {
                this.availableTeams = teams;
            })
            .catch(err => {
                console.log("Athlete-select: Could not load available teams..");
            });
    }
}
