import { Component, OnInit, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router, ActivatedRoute, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from '../../../authentication/services/auth.service';



@Component({
    selector: "ft-mobile-nav",
    templateUrl: "./mobile-nav.component.html",
    styleUrls: ["./mobile-nav.component.css"],
})
export class MobileNavMenuContentComponent implements OnInit {
    @Input() sideNav: MatSidenav;
    counter = 1;

    constructor(private router: Router, public readonly authService: AuthService) {}

    ngOnInit() {
    }

    async reload() {
        await new Promise( resolve => setTimeout(resolve, 1) );
        location.reload();
    }

    close() {
        this.sideNav.close();
    }

    open() {
        this.sideNav.open();
    }
}
