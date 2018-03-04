import { Component, OnInit } from "@angular/core";

import { FormControl, Validators } from "@angular/forms";

import { AddTeamData } from "../models/add-team-data";

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

    public teamNameFormControl = new FormControl("", [
        Validators.required,
        Validators.minLength(3)
    ]);

    public ageGroupFormControl = new FormControl("", [Validators.required]);

    constructor() {}

    onSubmit(): void {
        if (this.teamNameFormControl.valid === false) {
            console.log("Error: Team Name not valid.");
            return;
        }

        console.log(JSON.stringify(this.addTeamData));
    }
}
