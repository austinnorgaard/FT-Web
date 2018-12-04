import { Component, OnInit } from "@angular/core";
import { UserManagementService } from "../../services/user-management.service";
import { FormControl, Validators } from "@angular/forms";
import { UserRegistration } from "../../../../../../../smart-cone-api/src/Users/user-registration";
import { UserRegistrationModel } from "../../models/user-registration";
import { Router } from "@angular/router";

@Component({
    selector: "ft-app-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"],
})
export class RegisterPageComponent {
    userRegistration: UserRegistrationModel = new UserRegistrationModel();

    readonly prefixes: string[] = ["Mr", "Mrs", "Ms"];
    public alertClosed = true;

    public emailFormControl = new FormControl("", [Validators.required, Validators.email]);

    public passwordFormControl = new FormControl("", [Validators.required, Validators.minLength(8)]);

    readonly countries: string[] = [
        "United States",
        "United Kingdom",
        "Australia",
        "New Zealand",
        "Canada",
        "Greece",
        "Kazakhstan",
        "Some other country",
    ];

    submitted = false;

    constructor(private userManagement: UserManagementService, private router: Router) {}

    submit(): void {
        if (!this.emailFormControl.valid || !this.passwordFormControl.valid) {
            console.log("Either email or password is invalid!");
            return;
        }

        this.submitted = true;

        this.userManagement
            .createUser(this.userRegistration)
            .then(response => {
                console.log("User created successfully!!");
                this.router.navigateByUrl("/"); // w/e we have set as our home page
            })
            .catch(err => {
                console.log(err);
                this.alertClosed = false;
            });
    }

    nameInvalid(): boolean {
        return true;
    }
}