import { Component, OnInit } from "@angular/core";
import { LoginService } from "../api/login.service";
import { LoginCredentialsModel } from "../models/login-credentials";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "ft-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    private returnUrl: string;
    public alertShown = false;
    public alertType = "danger";
    public errorMessage: string = "None";
    alertTimeout: NodeJS.Timer;

    public emailFormControl = new FormControl("", [Validators.required, Validators.email]);
    public passwordFormControl = new FormControl("", [Validators.required]);

    constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        // grab the return url, default to home if none specified (user clicked
        // directly onto the login page)
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    login() {
        const credentials = new LoginCredentialsModel(this.email, this.password);
        // Do not allow user to submit if they haven't filled out the form
        if (!credentials.isValid()) {
            this.showErrorMessage("Enter an email and address.");
            return;
        }

        this.loginService
            .login(credentials)
            .then(response => {
                // success
                console.log("logged in!");
                this.router.navigateByUrl(this.returnUrl);
            })
            .catch(err => {
                // Error, figure out which one then pop message
                if (err.error.message.toLowerCase().includes("password incorrect")) {
                    this.showErrorMessage("Password incorrect!");
                } else if (err.error.message.toLowerCase().includes("email not found")) {
                    this.showErrorMessage("Email address not found!");
                }
            });
    }

    showErrorMessage(message: string) {
        this.alertShown = true;
        clearTimeout(this.alertTimeout);
        this.alertTimeout = setTimeout(() => (this.alertShown = false), 5000);
        this.errorMessage = message;
    }
}
