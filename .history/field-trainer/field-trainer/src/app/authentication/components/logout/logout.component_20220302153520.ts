import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { LoginResult, LoginService } from "../../services/login.service";
import { LoginCredentialsModel } from "../../models/login-credentials";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "ft-logout",
    templateUrl: "./logout.component.html",
    styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
    public email: string;
    public password: string;
    public loginInProgress: boolean = false;

    constructor(private router: Router) {}

    ngOnInit() {
    }

    async logout() {
        this.router.navigate(["login"]);
        this.loginInProgress = true;

        this.loginInProgress = false;
    }
}
