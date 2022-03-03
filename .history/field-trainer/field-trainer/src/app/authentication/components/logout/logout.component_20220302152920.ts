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
    public loginInProgress: boolean = false;
    private returnUrl: string;

    constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    async logout() {
        this.loginInProgress = true;
        const credentials = new LoginCredentialsModel(this.email, this.password);

        let result = LoginResult.FailureCredentials;

        if (result === LoginResult.Success) {
            // Successful, take user to page they were attempting to view before getting
            // redirected to login
            this.router.navigateByUrl(this.returnUrl);
        this.loginInProgress = false;
    }
}
