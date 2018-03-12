import { Component, OnInit } from "@angular/core";
import { UserManagementService } from "../api/user-management.service";
import { UserData } from "../../../../../smart-cone-api/src/Database/Data/UserData";
import { UserRegistrationData } from "../models/user-registration-data";

import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "ft-app-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"]
})
export class RegisterPageComponent {
    userData: UserData = new UserData();

    readonly prefixes: string[] = ["Mr", "Mrs", "Ms"];

    public emailFormControl = new FormControl("", [
        Validators.required,
        Validators.email
    ]);

    public passwordFormControl = new FormControl("", [
        Validators.required,
        Validators.minLength(8)
    ]);

    readonly countries: string[] = [
        "United States",
        "United Kingdom",
        "Australia",
        "New Zealand",
        "Canada",
        "Greece",
        "Kazakhstan",
        "Some other country"
    ];

    submitted = false;

    constructor(private userManagement: UserManagementService) {}

    submit(): void {
        if (!this.emailFormControl.valid || !this.passwordFormControl.valid) {
            console.log("Either email or password is invalid!");
            return;
        }

        this.submitted = true;
        console.log(this.userData);

        this.userManagement
            .createUser(this.userData)
            .then(response => {
                console.log("User created successfully!!");
            })
            .catch(err => {
                console.log(err);
                alert("Email already in use!");
            });
    }

    nameInvalid(): boolean {
        return true;
    }
}
