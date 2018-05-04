import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { TeamModel } from "../models/team";
import { Router, Data } from "@angular/router";
import { TeamManagementService } from "../api/team-management.service";
import { AthleteModel } from "../models/athlete";
import { AthleteManagementService } from "../api/athlete-management.service";
import { Team } from "../../../../../smart-cone-api/src/Teams/team";
import { Athlete } from "../../../../../smart-cone-api/src/Athletes/athlete";
import { MatSelectionList, MatSelectionListChange } from "@angular/material";
import { AddAthleteTeamModel } from "../../../../../smart-cone-api/src/Teams/add-athlete-team-model";
import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";

@Component({
    selector: "ft-team-management-page",
    templateUrl: "./team-management-page.component.html",
    styleUrls: ["./team-management-page.component.css"],
})
export class TeamManagementPageComponent implements OnInit {
    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    availableAthletes: AthleteModel[] = [];

    constructor(private router: Router, private teamsService: TeamManagementService, private athletesService: AthleteManagementService) {}

    ngOnInit() {
        this.updateAthletes();
        this.updateTeams();
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
        this.updateAthletes();
        // Grab the athletes for this team and set them
    }

    removeUnavailableAthletes() {
        // We can't prune athletes if no team is selected
        if (this.selectedTeam === null) {
            return;
        }

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
                console.log(athletes);
                this.availableAthletes = athletes;

                // immediately prune
                this.removeUnavailableAthletes();
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
                console.log("Could not find any teams.");
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
                console.log(`ERROR: Failed to get team with id: ${this.selectedTeam.id}. This should NOT happen!`);
                return;
            });
    }

    onAthleteRemoved(athlete: AthleteModel) {
        // in hindsight, silly name. The "AddAthleteTeamModel" is just an
        // athlete/team combo
        const data: AddAthleteTeamModel = {
            athleteId: athlete.id,
            teamId: this.selectedTeam.id,
        } as AddAthleteTeamModel;

        console.log(JSON.stringify(data));

        this.teamsService
            .removeAthleteFromTeam(data)
            .then((response: DatabaseResponse) => {
                this.updateAthletes();
                this.updateTeamAthletes();
            })
            .catch((error: DatabaseResponse) => {
                console.log("Failed to remove athlete");
                console.log(error);
            });
    }

    onAthleteAdded(athlete: AthleteModel) {
        console.log(`${athlete.firstName} ${athlete.lastName} added`);
        const data: AddAthleteTeamModel = {
            athleteId: athlete.id,
            teamId: this.selectedTeam.id,
        } as AddAthleteTeamModel;

        this.teamsService
            .addAthleteToTeam(data)
            .then((response: DatabaseResponse) => {
                this.updateAthletes();
                this.updateTeamAthletes();
            })
            .catch((error: DatabaseResponse) => {
                console.log(`Failed to add athlete.`);
                console.log(error);
            });
    }
}
