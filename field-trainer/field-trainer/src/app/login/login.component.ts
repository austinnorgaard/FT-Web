import { Component, OnInit } from "@angular/core";
import { LoginService } from "../api/login.service";
import { LoginCredentialsModel } from "../models/login-credentials";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "ft-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    private returnUrl: string;
    public alertShown: boolean = false;
    public alertType: string = "danger";
    alertTimeout: NodeJS.Timer;

    constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        // grab the return url, default to home if none specified (user clicked
        // directly onto the login page)
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    login() {
        let credentials = new LoginCredentialsModel(this.email, this.password);

        this.loginService.login(credentials).then(response => {
            if (response) {
                console.log("logged in!");
                this.router.navigateByUrl(this.returnUrl);
            } else {
                console.log("Failed to login. Bad email or password");
                this.alertShown = true;
                clearTimeout(this.alertTimeout);
                this.alertTimeout = setTimeout(() => (this.alertShown = false), 5000);
            }
        });
    }
}
