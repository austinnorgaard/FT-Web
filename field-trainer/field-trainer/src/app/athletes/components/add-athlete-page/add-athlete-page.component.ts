import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators, NgForm } from "@angular/forms";
import { TeamModel } from "../../../teams/models/team";
import { AthleteModel } from "../../models/athlete";
import { TeamManagementService } from "../../../teams/services/team-management.service";
import { AthleteManagementService } from "../../services/athlete-management.service";
import { AthleteRegistrationModel } from "../../models/athlete-registration";
import { DatabaseResponse } from "../../../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";

@Component({
    selector: "ft-add-athlete-page",
    templateUrl: "./add-athlete-page.component.html",
    styleUrls: ["./add-athlete-page.component.css"],
})
export class AddAthletePageComponent implements OnInit {
    genders: string[] = ["Male", "Female", "Non-Binary", "Other"];
    ageGroups: string[] = ["4-7", "8-10", "11-13", "13-15", "15-17", "18-20", "21-24"];

    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    athlete: AthleteModel = new AthleteModel();
    athleteForSubmission: AthleteModel = new AthleteModel();

    public ageGroupFormControl = new FormControl("", [Validators.required]);

    @ViewChild("addAthleteForm", { static: true }) form: NgForm;

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
            .catch((err) => {
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

        console.log(this.athleteForSubmission);

        // create registration data
        const registrationData = {
            athlete: this.athleteForSubmission,
            team: this.selectedTeam,
        } as AthleteRegistrationModel;

        this.athletesService
            .createAthlete(registrationData)
            .then((response) => {
                console.log("Athlete added!");
                this.form.resetForm();
            })
            .catch((err) => {
                console.log("Failed to add athlete");
            });
    }

    getTeamDropdownPlaceholderText() {
        if (this.availableTeams === null || this.availableTeams.length === 0) {
            return "No teams available";
        }
        return "Athlete's team";
    }
}
