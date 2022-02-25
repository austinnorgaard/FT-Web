import { Component, OnInit, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { AuthService } from '@FieldTrainer/authentication/services/auth.service';

@Component({
    selector: "ft-nav-menu-content",
    templateUrl: "./nav-menu-content.component.html",
    styleUrls: ["./nav-menu-content.component.css"],
})
export class NavMenuContentComponent implements OnInit {
    // Whether the user is logged in or not
    // We display either login/create-account links or a
    // switch-user & account link
    private authenticated: boolean = false;
    @Input() sideNav: MatSidenav;

    constructor(public readonly authService: AuthService) {}

    ngOnInit() {
    }

    close() {
        this.sideNav.close();
    }

    open() {
        this.sideNav.open();
    }
}
