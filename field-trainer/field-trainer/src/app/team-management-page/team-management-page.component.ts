import { Component, OnInit } from "@angular/core";
import { TeamModel } from "../models/team";
import { Router } from "@angular/router";
import { TeamManagementService } from "../api/team-management.service";

@Component({
    selector: "ft-team-management-page",
    templateUrl: "./team-management-page.component.html",
    styleUrls: ["./team-management-page.component.css"]
})
export class TeamManagementPageComponent implements OnInit {
    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    constructor(
        private router: Router,
        private teamsService: TeamManagementService
    ) {}

    ngOnInit() {
        this.teamsService
            .getTeams()
            .then((teams: TeamModel[]) => {
                this.availableTeams = teams;
            })
            .catch(err => {
                console.log("Could not find any teams.");
            });
    }

    addPlayer() {
        this.router.navigateByUrl("add-team");
    }

    getTeamDropdownPlaceholderText() {
        if (this.availableTeams.length === 0) {
            return "No teams available";
        } else {
            return "Select a team";
        }
    }

    onTeamChanged() {
        console.log(`Team selected; ${this.selectedTeam.teamName}`);
        console.log(
            `This team has ${this.selectedTeam.teamAthletes.length} athletes.`
        );

        // Grab the athletes for this team and set them
    }
}
