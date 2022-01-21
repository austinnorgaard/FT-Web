import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { LoginCredentialsModel } from "../../models/login-credentials";

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
    public errorMessage = "None";
    alertTimeout: any;

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
                this.router.navigateByUrl(this.returnUrl);
            })
            .catch(err => {
                console.log(JSON.stringify(err));
                // Error, figure out which one then pop message
                if (err.message.toLowerCase().includes("password incorrect")) {
                    this.showErrorMessage("Password incorrect!");
                } else if (err.message.toLowerCase().includes("email not found")) {
                    this.showErrorMessage("Email address not found!");
                } else {
                    this.showErrorMessage("Unknown error");
                }
            });
    }

    register() {
        this.router.navigateByUrl("register");
    }

    showErrorMessage(message: string) {
        this.alertShown = true;
        clearTimeout(this.alertTimeout);
        this.alertTimeout = setTimeout(() => (this.alertShown = false), 5000);
        this.errorMessage = message;
    }
}
