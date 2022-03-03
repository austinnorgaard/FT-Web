import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "ft-logout",
    templateUrl: "./logout.component.html",
    styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
    public loginInProgress: boolean = false;

    constructor(private router: Router) {}

    ngOnInit() {

    }

    async logout() {
        this.router.navigateByUrl("login");
    }
}
