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

    logout() {
        this.router.navigateByUrl(this.router.url);
        location.reload();
        localStorage.removeItem("token");
        localStorage.setItem("status", "logged out");
    }

    currentPath(): string {
        localStorage.setItem("route", this.router.url);

        // take the router url and extract a pretty
        // path for our title bar
        if (this.router.url.toLowerCase().includes("athlete-management")) {
            return "Field Trainer | Athletes";
        }

        if (this.router.url.toLowerCase().includes("add-team")) {
            return "Field Trainer | Teams";
        }

        const titleString = this.prettyString(this.router.url.replace("/", " | "));
        return `Field Trainer ${titleString}`;
    }
    
    private prettyString(item: string) {
        // Hacky, hard-coded solution.
        return item.substr(0, 3) + item.charAt(3).toUpperCase() + item.slice(4);
    }


}
