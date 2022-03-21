import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators, NgForm } from "@angular/forms";
import { TeamModel } from "../../models/team";
import { TeamManagementService } from "../../services/team-management.service";
import { DatabaseResponse } from "../../../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../../../../../../../smart-cone-api/src/Database/Data/DatabaseEnums";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: "ft-add-team",
    templateUrl: "./add-team.component.html",
    styleUrls: ["./add-team.component.css"],
})
export class AddTeamComponent {
    ageGroups: string[] = ["4-7", "8-10", "11-13", "13-15", "15-17", "18-20", "21-24"];
    genders: string[] = ["Male", "Female", "Non-Binary", "Other"];
    submitted = false;
    teamModel = new TeamModel();
    alertShouldBeDisplayed = false;
    alertMessage = "";
    alertType = "success";
    alertTimeout: any;

    public teamNameFormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);

    public ageGroupFormControl = new FormControl("", [Validators.required]);

    @ViewChild("addTeamForm", { static: true }) form: NgForm;

    constructor(private teamManagement: TeamManagementService, public router: Router) {}

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

    getImage() {
        return "../../../../assets/placeholder2.jpg";
    }

    done () {
        this.router.navigateByUrl('/team-management');
    }
}
