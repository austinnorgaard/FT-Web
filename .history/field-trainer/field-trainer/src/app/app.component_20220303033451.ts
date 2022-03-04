import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './authentication/services/auth.service';
import { LoginResult } from "./authentication/services/login.service";
@Component({
    selector: "ft-app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})

export class AppComponent {

    public alertShown = false;
    public alertType = "danger";
    public errorMessage = "None";
    alertTimeout: any;
    returnUrl: string;
    loc: string;

    constructor(private router: Router, public authService: AuthService, private route: ActivatedRoute) {
        this.router = router;
    }

    ngOnInit() {
        if (this.router.url === "/home" || this.router.url === "null")
        {
            localStorage.setItem("place", "home");
        }
        else
        {
            localStorage.setItem("place", "not home");
        }
        this.loc = localStorage.getItem("place")
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

    logout() {
        this.router.navigateByUrl(this.router.url);
        location.reload();
        localStorage.removeItem("token");
        localStorage.setItem("status", "logged out");
    }

    getBackgroundColor() {
        let color = 'transparent';
        let background = 'transparent';
        if (this.loc === 'not home')
        {
            color = '#111111';
            background = 'rgba(17, 17, 17, 0.9)';
        }
        else
        {
            color = 'transparent';
        }
        return color && background;
    }
}
