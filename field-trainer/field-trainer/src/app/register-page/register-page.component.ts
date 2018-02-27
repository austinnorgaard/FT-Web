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
    userData: UserRegistrationData = new UserRegistrationData();

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
        // console.log(this.userData);

        // if (!this.userData.isValid()) {
        //     // TODO: Do something to inform user
        //     console.log("Data is invalid!");
        //     return;
        // }

        // // Data is good, convert then send
        // let data: UserData = new UserData();
        // data.prefix = this.userData.prefix;
        // data.firstName = this.userData.firstName;
        // data.lastName = this.userData.lastName;
        // data.address1 = this.userData.address1;
        // data.address2 = this.userData.address2;
        // data.city = this.userData.city;
        // data.state = this.userData.state;
        // data.zipCode = this.userData.zipCode;
        // data.country = this.userData.country;
        // data.phoneNumber = this.userData.phoneNumber;
        // data.email = this.userData.emailAddress;
        // data.passwordHash = this.userData.password; // obviously wrong
        // data.passwordSalt = "AWESOME_SALT"; // obviously wrong

        // this.userManagement.createUser(data).then(response => {
        //     console.log(response);
        // });
    }

    nameInvalid(): boolean {
        return true;
    }
}
