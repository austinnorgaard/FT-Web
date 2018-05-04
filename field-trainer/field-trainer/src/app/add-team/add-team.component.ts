import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators, NgForm } from "@angular/forms";
import { TeamModel } from "../models/team";
import { TeamManagementService } from "../api/team-management.service";

import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../../../../../smart-cone-api/src/Database/Data/DatabaseEnums";

@Component({
    selector: "ft-add-team",
    templateUrl: "./add-team.component.html",
    styleUrls: ["./add-team.component.css"],
})
export class AddTeamComponent {
    ageGroups: string[] = ["11-13", "13-15", "15-17"];
    genders: string[] = ["Male", "Female"];
    submitted = false;
    teamModel = new TeamModel();
    alertShouldBeDisplayed = false;
    alertMessage = "";
    alertType = "success";
    alertTimeout: NodeJS.Timer;

    public teamNameFormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);

    public ageGroupFormControl = new FormControl("", [Validators.required]);

    @ViewChild("addTeamForm") form: NgForm;

    constructor(private teamManagement: TeamManagementService) {}

    onSubmit(): void {
        if (this.teamNameFormControl.valid === false) {
            console.log("Error: Team Name not valid.");
            return;
        }

        this.teamManagement
            .createTeam(this.teamModel)
            .then(response => {
                console.log("Team added!");
                this.form.resetForm();
                this.teamNameFormControl.reset();
                this.showAlert("Team added successfully.", "success", 5000);
            })
            .catch((err: DatabaseResponse) => {
                console.log("Caught error!");
                const message =
                    err.failureType === DatabaseFailureType.UniqueConstraintViolated ? "This team already exists." : "Unknown server error!";

                this.showAlert(message, "danger", 5000);
            });
    }

    showAlert(message: string, type: string, timeout: number) {
        this.alertShouldBeDisplayed = true;
        clearTimeout(this.alertTimeout);
        this.alertTimeout = setTimeout(() => (this.alertShouldBeDisplayed = false), timeout);
        this.alertMessage = message;
        this.alertType = type;
    }
}
