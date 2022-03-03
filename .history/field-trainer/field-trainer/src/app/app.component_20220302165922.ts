import { Component } from "@angular/core";
import { Router } from "@angular/router";
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

    private authenticated: boolean = false;



    constructor(private router: Router, public authService: AuthService) {
        this.router = router;
    }

    ngOnInit() {
    }

    currentPath(): string {
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
        this.showErrorMessage("User Has Been Logged Out");
        localStorage.removeItem("token");
    }
    showErrorMessage(message: string) {
        this.alertShown = true;
        clearTimeout(this.alertTimeout);
        this.alertTimeout = setTimeout(() => (this.alertShown = false), 5000);
        this.errorMessage = message;
    }
}
