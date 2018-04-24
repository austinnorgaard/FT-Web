import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { TeamModel } from "../models/team";
import { Router } from "@angular/router";
import { TeamManagementService } from "../api/team-management.service";
import { AthleteModel } from "../models/athlete";
import { AthleteManagementService } from "../api/athlete-management.service";
import { Team } from "../../../../../smart-cone-api/src/Teams/team";
import { Athlete } from "../../../../../smart-cone-api/src/Athletes/athlete";
import { MatSelectionList, MatSelectionListChange } from "@angular/material";

@Component({
    selector: "ft-team-management-page",
    templateUrl: "./team-management-page.component.html",
    styleUrls: ["./team-management-page.component.css"]
})
export class TeamManagementPageComponent implements OnInit {
    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    availableAthletes: AthleteModel[] = [];

    constructor(
        private router: Router,
        private teamsService: TeamManagementService,
        private athletesService: AthleteManagementService
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

        this.updateAthletes();
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
        console.log(`This team has ${this.selectedTeam.teamAthletes.length} athletes.`);
        this.updateAthletes();
        // Grab the athletes for this team and set them
    }

    removeUnavailableAthletes() {
        // remove any athletes which belong to the selected team
        this.availableAthletes = this.availableAthletes.filter((athlete: Athlete) => {
            // check every athlete's currently subscribed teams to see if any of them
            // match the selected team
            return !athlete.teams.some((team: Team) => {
                return team.id === this.selectedTeam.id;
            });
        });
    }

    updateAthletes() {
        this.athletesService
            .getAthletes()
            .then((athletes: AthleteModel[]) => {
                this.availableAthletes = athletes;

                // immediately prune
                this.removeUnavailableAthletes();
            })
            .catch(err => {
                console.log("Could not find any athletes.");
            });
    }
}
