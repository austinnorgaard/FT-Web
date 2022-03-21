import { Component, OnInit } from "@angular/core";
import { Router, Data } from "@angular/router";
import { TeamModel } from "../../../teams/models/team";
import { AthleteModel } from "../../../athletes/models/athlete";
import { TeamManagementService } from "../../../teams/services/team-management.service";
import { AthleteManagementService } from "../../../athletes/services/athlete-management.service";
import { Team } from "../../../../../../../smart-cone-api/src/Teams/team";

@Component({
    selector: "ft-result-page",
    templateUrl: "./result-page.component.html",
    styleUrls: ["./result-page.component.css"],
})
export class ResultPageComponent implements OnInit {
    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    availableAthletes: AthleteModel[] = [];

    constructor(private teamsService: TeamManagementService, private athletesService: AthleteManagementService) {}

    ngOnInit() {
        this.updateAthletes();
        this.updateTeams();
    }

    getTeamDropdownPlaceholderText() {
        if (this.availableTeams.length === 0) {
            return "No teams available";
        } else {
            return "Select a team";
        }
    }

    onTeamChanged() {
        this.updateAthletes();
        // Grab the athletes for this team and set them
    }

    updateAthletes() {
        this.athletesService
            .getAthletes()
            .then((athletes: AthleteModel[]) => {
                console.log(athletes);
                this.availableAthletes = athletes;
            })
            .catch(err => {
                console.log(`Could not find any athletes. Err: ${err}`);
            });
    }

    updateTeams() {
        this.teamsService
            .getTeams()
            .then((teams: TeamModel[]) => {
                this.availableTeams = teams;
            })
            .catch(err => {
                console.log(`Could not find any teams. Err: ${err}`);
            });
    }

    updateTeamAthletes() {
        // updates the local athletes list model for the selected team
        // Ask the server for the team details
        this.teamsService
            .getTeamById(this.selectedTeam.id)
            .then((team: Team) => {
                // update our local copy of the team with the one we just grabbed
                this.selectedTeam.teamAthletes = team.teamAthletes;
            })
            .catch(err => {
                console.log(`ERROR: Failed to get team with id: ${this.selectedTeam.id}. This should NOT happen! Err: ${err}`);
                return;
            });
    }
}
