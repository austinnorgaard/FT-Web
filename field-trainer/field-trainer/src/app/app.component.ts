import { Component, NgZone, OnInit, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { AuthService } from './authentication/services/auth.service';
import { LoginResult } from "./authentication/services/login.service";

@Component({
    selector: "ft-app-root",
    templateUrl: 'app.component.html',
    styleUrls: ["./app.component.css"],
})

export class AppComponent implements OnInit {

    public alertShown = false;
    public alertType = "danger";
    public errorMessage = "None";
    public width;
    alertTimeout: any;
    @Input() sideNav: MatSidenav;
    returnUrl: string;

    constructor(private router: Router, public authService: AuthService, private route: ActivatedRoute, private ngZone: NgZone) {
        this.router = router;
    }

    public ngOnInit() {
        this.setField("soccer");
        window.onresize = (e) =>
        {
            this.ngZone.run(() => {
                this.width = window.innerWidth;
            });
        };
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
            color = 'var(--color-tertiary)';
        }
        else
        {
            color = 'var(--color-tertiary2)';
        }
        return color;
    }

    setField(field: string){
        localStorage.setItem("field", field);
        field = localStorage.getItem("field")
        if (field === 'football')
        {
            localStorage.setItem("title", "Football");
            localStorage.setItem("description", "A sport with running and throwing a ball");
        }
        else if (field === 'soccer')
        {
            localStorage.setItem("title", "Soccer");
            localStorage.setItem("description", "A sport with running and kicking a ball");
        }
        else if (field === 'basketball')
        {
            localStorage.setItem("title", "Basketball");
            localStorage.setItem("description", "A sport with running and shooting a ball");
        }
        else if (field === 'track')
        {
            localStorage.setItem("title", "Track");
            localStorage.setItem("description", "A sport with running");
        }
        let description = localStorage.getItem("description");
        let title = localStorage.getItem("title");
        document.getElementById("sport_t").innerHTML = title;
        document.getElementById("sport_d").innerHTML = description;
    }

    getImage() {
        let field = localStorage.getItem("field")
        if (field === 'football')
        {
            return '../assets/1200px-AmFBfield.svg.png';
        }
        else if (field === 'soccer')
        {
            return '../assets/Soccer_field_-_empty.svg.png';
        }
        else if (field === 'basketball')
        {
            return '../assets/istockphoto-1212609648-612x612.jpg';
        }
        else if (field === 'track')
        {
            return '../assets/cartoon-running-track-stadium-vector-17932997.jpg';
        }
    }

    async reload() {
        await new Promise( resolve => setTimeout(resolve, 1) );
        location.reload();
    }

    async close() {
        document.getElementById("sidebar").style.display = "none";
        document.getElementById("side").style.display = "none";
        document.getElementById("close").style.display = "none";
        document.getElementById("open").style.display = "initial";
        document.getElementById("sidebar").style.visibility = "hidden";
        document.getElementById("side").style.visibility = "hidden";
        document.getElementById("close").style.visibility = "hidden";
        document.getElementById("open").style.visibility = "visible";
        document.getElementById("title").style.color = "var(--color-primary)";
    }

    open() {
        document.getElementById("sidebar").style.display = "flex";
        document.getElementById("side").style.display = "flex";
        document.getElementById("close").style.display = "block";
        document.getElementById("open").style.display = "none";
        document.getElementById("sidebar").style.visibility = "visible";
        document.getElementById("side").style.visibility = "visible";
        document.getElementById("close").style.visibility = "visible";
        document.getElementById("open").style.visibility = "hidden";
        document.getElementById("title").style.color = "var(--color-secondary)";
      }
}
