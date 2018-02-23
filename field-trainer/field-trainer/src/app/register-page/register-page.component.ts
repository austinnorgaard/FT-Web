import { Component, OnInit } from "@angular/core";
import { UserRegistrationData } from "../data/user-registration-data";

@Component({
    selector: "ft-app-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"]
})
export class RegisterPageComponent implements OnInit {
    userData: UserRegistrationData = new UserRegistrationData();

    readonly prefixes: string[] = ["Mr", "Mrs", "Ms"];

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

    constructor() {}

    ngOnInit() {}

    submit(): void {
        console.log(this.userData);

        if (this.userData.isValid()) {
            console.log("Data is valid!");
        } else {
            console.log("ERROR: Data invalid!");
        }
    }
}
