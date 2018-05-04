import { Component, OnInit, ViewChild } from "@angular/core";
import { TeamManagementService } from "../api/team-management.service";
import { Team } from "../../../../../smart-cone-api/src/Teams/team";
import { TeamModel } from "../models/team";
import { AthleteModel } from "../models/athlete";
import { AthleteRegistrationModel } from "../models/athlete-registration";
import { AthleteManagementService } from "../api/athlete-management.service";
import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { NgForm } from "@angular/forms";

@Component({
    selector: "ft-add-athlete-page",
    templateUrl: "./add-athlete-page.component.html",
    styleUrls: ["./add-athlete-page.component.css"],
})
export class AddAthletePageComponent implements OnInit {
    genders: string[] = ["Male", "Female"];
    heights: string[] = [
        `4'0"`,
        `4'1"`,
        `4'2"`,
        `4'3"`,
        `4'4"`,
        `4'5"`,
        `4'6"`,
        `4'7"`,
        `4'8"`,
        `4'9"`,
        `4'10"`,
        `4'11"`,
        `5'0"`,
        `5'1"`,
        `5'2"`,
        `5'3"`,
        `5'4"`,
        `5'5"`,
        `5'6"`,
        `5'7"`,
        `5'8"`,
        `5'9"`,
        `5'10"`,
        `5'11"`,
        `6'0"`,
        `6'1"`,
        `6'2"`,
        `6'3"`,
        `6'4"`,
        `6'5"`,
        `6'6"`,
        `6'7"`,
        `6'8"`,
        `6'9"`,
    ];

    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    athlete: AthleteModel = new AthleteModel();
    athleteForSubmission: AthleteModel = new AthleteModel();

    @ViewChild("addAthleteForm") form: NgForm;

    constructor(private readonly teamService: TeamManagementService, private readonly athletesService: AthleteManagementService) {}

    ngOnInit() {
        // populate our available teams array when the data is ready
        this.populateTeams();
    }

    populateTeams() {
        this.teamService
            .getTeams()
            .then((teams: TeamModel[]) => {
                // it worked
                console.log(`Found ${teams.length} teams.`);
                this.availableTeams = teams;
            })
            .catch(err => {
                console.log(`Failed to query teams. Reason: ${err}`);
            });
    }

    validateParent(): boolean {
        if (this.athleteForSubmission.parent1Name && this.athleteForSubmission.parent1Name.length > 1) {
            // if set, validate the rest of the fields
            // phone and email must be set
            if (!this.athleteForSubmission.parent1Phone || this.athleteForSubmission.parent1Phone.length < 1) {
                console.log("Error: If parent 1 name is set, phonenumber should be set too");
                return false;
            }

            if (!this.athleteForSubmission.parent1Email || this.athleteForSubmission.parent1Email.length < 1) {
                console.log("Error: If parent 1 name is set, email should be set too");
                return false;
            }
        }

        if (this.athleteForSubmission.parent2Name && this.athleteForSubmission.parent2Name.length > 1) {
            // if set, validate the rest of the fields
            // phone and email must be set
            if (!this.athleteForSubmission.parent2Phone || this.athleteForSubmission.parent2Phone.length < 1) {
                console.log("Error: If parent 2 name is set, phonenumber should be set too");
                return false;
            }

            if (!this.athleteForSubmission.parent2Email || this.athleteForSubmission.parent2Email.length < 1) {
                console.log("Error: If parent 2 name is set, email should be set too");
                return false;
            }
        }

        return true;
    }

    onSubmit() {
        // create a copy of the athlete so we can muck with its fields
        Object.assign(this.athleteForSubmission, this.athlete);

        if (!this.validateParent()) {
            return;
        }

        console.log(this.athleteForSubmission);

        // create registration data
        const registrationData = {
            athlete: this.athleteForSubmission,
            team: this.selectedTeam,
        } as AthleteRegistrationModel;

        console.log("Team for submission");
        console.log(registrationData);

        this.athletesService
            .createAthlete(registrationData)
            .then(response => {
                console.log("Athlete added!");
                this.form.resetForm();
            })
            .catch((err: DatabaseResponse) => {
                console.log("Failed to add athlete");
                console.log(err);
            });
    }

    getTeamDropdownPlaceholderText() {
        if (this.availableTeams === null || this.availableTeams.length === 0) {
            return "No teams available";
        }
        return "Athlete's team";
    }
}
