import { Component, OnInit, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { AuthService } from '../../../authentication/services/auth.service';


@Component({
    selector: "ft-nav-menu-content",
    templateUrl: "./nav-menu-content.component.html",
    styleUrls: ["./nav-menu-content.component.css"],
})
export class NavMenuContentComponent implements OnInit {
    @Input() sideNav: MatSidenav;
    constructor(public readonly authService: AuthService) {}

    ngOnInit() {
    }

    close() {
        this.sideNav.close();
    }

    async reload() {
        await new Promise( resolve => setTimeout(resolve, 1) );
        location.reload();
    }

    open() {
        this.sideNav.open();
    }
}
