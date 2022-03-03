import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginResult, LoginService } from "../../services/login.service";

@Component({
    selector: "ft-logout",
    templateUrl: "./logout.component.html",
    styleUrls: ["./logout.component.css"],
})
export class LogoutPageComponent implements OnInit {
    public loginInProgress: boolean = false;

    constructor(private loginService: LoginService, private router: Router) {}

    ngOnInit() {

    }

    async logout() {
        this.loginInProgress = true;

        let result = await this.loginService.login(null);

        this.router.navigateByUrl("login");
    }
}
