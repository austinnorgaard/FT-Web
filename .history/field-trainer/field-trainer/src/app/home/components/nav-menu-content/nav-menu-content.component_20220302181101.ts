import { Component, OnInit, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
    selector: "ft-nav-menu-content",
    templateUrl: "./nav-menu-content.component.html",
    styleUrls: ["./nav-menu-content.component.css"],
})
export class NavMenuContentComponent implements OnInit {

    constructor(public readonly authService: AuthService) {}

    ngOnInit() {
    }
}
