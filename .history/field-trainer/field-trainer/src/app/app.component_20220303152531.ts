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

    constructor(private router: Router, public authService: AuthService, private route: ActivatedRoute) {
        this.router = router;
    }

    ngOnInit() {
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
        if (this.router.url === "/home")
        {
            color = 'transparent';
        }
        else
        {
            color = '#111111';
        }
        return color;
    }

    getLoc(){
        let elem = document.querySelector('a');
        let rect = elem.getBoundingClientRect();
        console.log("x: "+ rect.x);
        console.log("y: "+ rect.y);
    }
}
