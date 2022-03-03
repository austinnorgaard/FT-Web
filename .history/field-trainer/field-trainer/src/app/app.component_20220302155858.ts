import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from './authentication/services/auth.service';
import { LoginResult } from "../../services/login.service";
@Component({
    selector: "ft-app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})

export class AppComponent {

    private authenticated: boolean = false;



    constructor(private router: Router, public readonly authService: AuthService) {
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
        let result = LoginResult.FailureCredentials;

        if (result === LoginResult.FailureCredentials)
        {
            this.router.navigateByUrl("register");
        }
    }
}
