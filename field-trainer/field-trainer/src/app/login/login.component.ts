import { Component, OnInit } from "@angular/core";
import { LoginService } from "../api/login.service";
import { LoginCredentialsModel } from "../models/login-credentials";

@Component({
    selector: "ft-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;

    constructor(private loginService: LoginService) {}

    ngOnInit() {}

    login() {
        let credentials = new LoginCredentialsModel(this.email, this.password);

        this.loginService.login(credentials).then(response => {
            if (response) {
                console.log("logged in!");
            } else {
                console.log("Failed to login. Bad email or password");
            }
        });
    }
}
