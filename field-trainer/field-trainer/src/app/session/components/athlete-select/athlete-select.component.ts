import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TeamModel } from "../../../teams/models/team";
import { TeamManagementService } from "../../../teams/services/team-management.service";
import { AthleteManagementService } from "../../../athletes/services/athlete-management.service";
import { AthleteModel } from "../../../athletes/models/athlete";
import { Athlete } from "../../../../../../../smart-cone-api/src/Athletes/athlete";
import { SessionSetupService } from "../../services/session-setup.service";
import { SessionService } from "../../services/session.service";

@Component({
    selector: "ft-athlete-select",
    templateUrl: "./athlete-select.component.html",
    styleUrls: ["./athlete-select.component.css"],
})
export class AthleteSelectComponent implements OnInit {
    public selectedTeam: TeamModel;
    public availableTeams: TeamModel[];
    constructor(
        private router: Router,
        private sessionService: SessionService,
        private teamsService: TeamManagementService,
        private readonly sessionSetup: SessionSetupService,
    ) {
        this.loadAvailableTeams();
    }

    ngOnInit() {}

    onClick() {
        this.router.navigateByUrl("/session-setup/field-select");
    }

    onTeamChanged() {}

    onNext() {
        // Lock in the selected athletes
        this.sessionSetup.setAthletes(this.selectedTeam.teamAthletes);
        this.sessionService.start();
        this.router.navigateByUrl("/training-session");
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

    onMoveAthleteUp(athlete: AthleteModel) {
        console.log("Move-up: ", athlete);
        // Move this athlete up (closer to the front of the array)
        // First, check if we even need to do anything.

        const index = this.getIndexOfAthlete(athlete);

        if (index === 0) {
            return;
        }

        // Ok, so the athlete can be moved up, so swap the elements at index and index -1
        this.swapAthlete(index, index - 1);
    }

    onMoveAthleteDown(athlete: AthleteModel) {
        console.log("Move-down: ", athlete);
        const index = this.getIndexOfAthlete(athlete);

        if (index === this.selectedTeam.teamAthletes.length - 1) {
            return;
        }

        // Ok, so the athlete can be moved down, so swap the elements at index and index +1
        this.swapAthlete(index, index + 1);
    }

    onSetAthleteInactive(athlete: AthleteModel) {
        console.log("Set-Inactive: ", athlete);
    }

    // Swaps the athlete at position 'x' with the athlete at position 'y'
    // from the currently selected team
    swapAthlete(x: number, y: number) {
        // This some weird looking javascript, but it looks cool anyway
        [this.selectedTeam.teamAthletes[x], this.selectedTeam.teamAthletes[y]] = [
            this.selectedTeam.teamAthletes[y],
            this.selectedTeam.teamAthletes[x],
        ];
    }

    getIndexOfAthlete(athlete: Athlete) {
        return this.selectedTeam.teamAthletes.findIndex(
            a => a.firstName === athlete.firstName && a.lastName === athlete.lastName && a.email === athlete.email,
        );
    }
}
