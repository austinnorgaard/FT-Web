import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { LoginResult, LoginService } from "../../services/login.service";
import { LoginCredentialsModel } from "../../models/login-credentials";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "ft-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public loginInProgress: boolean = false;
    private returnUrl: string;
    public alertShown = false;
    public alertType = "danger";
    public errorMessage = "None";
    public alertMessage = "None";
    alertTimeout: any;
    public loggedOutType: string = localStorage.getItem("status");

    public emailFormControl = new FormControl("", [Validators.required, Validators.email]);
    public passwordFormControl = new FormControl("", [Validators.required]);

    constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        // grab the return url, default to home if none specified (user clicked
        // directly onto the login page)
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
        if (this.loggedOutType === "logged out"){
            this.showMessage("Successfully Logged Out");
            localStorage.setItem("status", "null");
        }
    }

    async login() {
        this.loginInProgress = true;
        const credentials = new LoginCredentialsModel(this.email, this.password);
        // Do not allow user to submit if they haven't filled out the form
        if (!credentials.isValid()) {
            this.showErrorMessage("Enter an email and password");
            this.loginInProgress = false;
            return;
        }

        let result = await this.loginService.login(credentials);

        if (result === LoginResult.Success) {
            // Successful, take user to page they were attempting to view before getting
            // redirected to login
            this.router.navigateByUrl(this.returnUrl);
        } else if (result === LoginResult.FailureCredentials) {
            this.showErrorMessage("Incorrect email or password");
        } else if (result === LoginResult.FailureNetwork) {
            this.showErrorMessage("Network or client error. Internet connectivity, or server down?");
        } else if (result === LoginResult.FailureServer) {
            this.showErrorMessage("Login failure due to server error");
        } else if (result === LoginResult.Unknown) {
            this.showErrorMessage("Login failure due to unknown error");
        }
        this.loginInProgress = false;
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

    showMessage(message: string) {
        this.alertShown = false;
        this.alertTimeout = setTimeout(() => (this.alertShown = false), 5000);
        this.alertMessage = message;
    }
}
