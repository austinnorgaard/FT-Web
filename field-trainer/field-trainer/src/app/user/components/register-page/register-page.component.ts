import { Component } from "@angular/core";
import { CreateUserResult, UserManagementService } from "../../services/user-management.service";
import { UserRegistrationModel } from "../../models/user-registration";
import { Router } from "@angular/router";

@Component({
    selector: "ft-app-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"],
})
export class RegisterPageComponent {
    userRegistration: UserRegistrationModel = new UserRegistrationModel();

    public alertShown = false;
    public errorMessage: string = "";
    alertTimeout: any;

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

    async submit() {
        this.submitted = true;

        let result = await this.userManagement.createUser(this.userRegistration);

        if (result === CreateUserResult.Success) {
            console.log(`User: ${this.userRegistration.user.firstName} ${this.userRegistration.user.lastName} created successfully`);
            // Bounce us out to the homepage
            this.router.navigateByUrl("/");
        } else if (result === CreateUserResult.FailureConstraintViolation) {
            // Reused an email
            console.log("Unique constraint violation on email, already in use");
            this.showErrorMessage("Email address already in use");
        } else {
            console.log(result);
            console.log(`Failed to create user. Error: ${result.toString()}`);
        }
    }

    showErrorMessage(message: string) {
        this.alertShown = true;
        clearTimeout(this.alertTimeout);
        this.alertTimeout = setTimeout(() => (this.alertShown = false), 5000);
        this.errorMessage = message;
    }

    nameInvalid(): boolean {
        return true;
    }
}
