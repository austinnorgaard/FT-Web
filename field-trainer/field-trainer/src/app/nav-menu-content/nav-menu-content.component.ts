import { Component, OnInit, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
    selector: "ft-nav-menu-content",
    templateUrl: "./nav-menu-content.component.html",
    styleUrls: ["./nav-menu-content.component.css"],
})
export class NavMenuContentComponent implements OnInit {
    @Input() sideNav: MatSidenav;

    constructor() {}

    ngOnInit() {}

    close() {
        this.sideNav.close();
    }

    open() {
        this.sideNav.open();
    }
}
