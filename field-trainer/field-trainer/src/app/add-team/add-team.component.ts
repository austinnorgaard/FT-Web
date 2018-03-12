import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AddTeamData } from "../models/add-team-data";
import { TeamManagementService } from "../api/team-management.service";

import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../../../../../smart-cone-api/src/Database/Data/DatabaseEnums";

@Component({
    selector: "ft-add-team",
    templateUrl: "./add-team.component.html",
    styleUrls: ["./add-team.component.css"]
})
export class AddTeamComponent {
    ageGroups: string[] = ["11-13", "13-15", "15-17"];
    genders: string[] = ["Male", "Female"];
    submitted = false;
    addTeamData: AddTeamData = new AddTeamData();
    alertShouldBeDisplayed = false;
    alertMessage = "";
    alertType = "success";
    alertTimeout: NodeJS.Timer;

    public teamNameFormControl = new FormControl("", [
        Validators.required,
        Validators.minLength(3)
    ]);

    public ageGroupFormControl = new FormControl("", [Validators.required]);

    constructor(private teamManagement: TeamManagementService) {}

    onSubmit(): void {
        if (this.teamNameFormControl.valid === false) {
            console.log("Error: Team Name not valid.");
            return;
        }

        this.teamManagement
            .createTeam(this.addTeamData)
            .then(response => {
                console.log("Team added!");
                this.showAlert("Team added successfully.", "success", 5000);
            })
            .catch((err: DatabaseResponse) => {
                console.log("Caught error!");
                let message =
                    err.failureType ===
                    DatabaseFailureType.UniqueConstraintViolated
                        ? "This team already exists."
                        : "Unknown server error!";

                this.showAlert(message, "danger", 5000);
            });
    }

    showAlert(message: string, type: string, timeout: number) {
        this.alertShouldBeDisplayed = true;
        clearTimeout(this.alertTimeout);
        this.alertTimeout = setTimeout(
            () => (this.alertShouldBeDisplayed = false),
            timeout
        );
        this.alertMessage = message;
        this.alertType = type;
    }
}
