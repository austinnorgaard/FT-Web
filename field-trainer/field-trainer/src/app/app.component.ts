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

    fields = ['football', 'soccer', 'basketball', 'track'];
    id = ['sidebar', 'side', 'close', 'open', 'title'];
    public alertShown = false;
    public alertType = "danger";
    public errorMessage = "None";
    public width;
    alertTimeout: any;
    @Input () sideNav: MatSidenav;
    returnUrl: string;

    constructor (private router: Router, public authService: AuthService, private route: ActivatedRoute, private ngZone: NgZone) {
        this.router = router;
    }

    public ngOnInit () {
        this.setField (this.fields[1]);
        window.onresize = (e) =>
        {
            this.ngZone.run ( () => {
                this.width = window.innerWidth;
            });
        };
    }

    currentPath (): string {
        localStorage.setItem ("route", this.router.url);

        // take the router url and extract a pretty
        // path for our title bar
        if (this.router.url.toLowerCase ().includes ("athlete-management")) {
            return "Field Trainer | Athletes";
        }

        if (this.router.url.toLowerCase ().includes ("add-team")) {
            return "Field Trainer | Teams";
        }

        const titleString = this.prettyString (this.router.url.replace ("/", " | "));
        return `Field Trainer ${titleString}`;
    }

    private prettyString (item: string) {
        // Hacky, hard-coded solution.
        return item.substr (0, 3) + item.charAt (3).toUpperCase () + item.slice (4);
    }

    logout () {
        this.router.navigateByUrl (this.router.url);
        location.reload ();
        localStorage.removeItem ("token");
        localStorage.setItem ("status", "logged out");
    }

    getBackgroundColor () {
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

    setField (field: string){
        localStorage.setItem ("field", field);
        field = localStorage.getItem ("field");
        if (field === this.fields[0])
        {
            localStorage.setItem ("title", this.toCapital (this.fields[0]));
            localStorage.setItem ("description", "A sport with running and throwing a ball");
        }
        else if (field === this.fields[1])
        {
            localStorage.setItem ("title", this.toCapital (this.fields[1]));
            localStorage.setItem ("description", "A sport with running and kicking a ball");
        }
        else if (field === this.fields[2])
        {
            localStorage.setItem ("title", this.toCapital (this.fields[2]));
            localStorage.setItem ("description", "A sport with running and shooting a ball");
        }
        else if (field === this.fields[3])
        {
            localStorage.setItem ("title", this.toCapital (this.fields[3]));
            localStorage.setItem ("description", "A sport with running");
        }
        let description = localStorage.getItem ("description");
        let title = localStorage.getItem ("title");
        document.getElementById ("sport_t").innerHTML = title;
        document.getElementById ("sport_d").innerHTML = description;
    }

    toCapital (string) {
        return string.charAt (0).toUpperCase () + string.slice (1);
    }

    getImage () {
        let field = localStorage.getItem ("field")
        if (field === this.fields[0])
        {
            return '../assets/1200px-AmFBfield.svg.png';
        }
        else if (field === this.fields[1])
        {
            return '../assets/Soccer_field_-_empty.svg.png';
        }
        else if (field === this.fields[2])
        {
            return '../assets/istockphoto-1212609648-612x612.jpg';
        }
        else if (field === this.fields[3])
        {
            return '../assets/cartoon-running-track-stadium-vector-17932997.jpg';
        }
    }

    async reload () {
        await new Promise ( resolve => setTimeout (resolve, 1) );
        location.reload ();
    }

    async close () {
        for (let i = 0; i < 3; i++ ) {
            document.getElementById (this.id[i]).style.display = "none";
            document.getElementById (this.id[i]).style.visibility = "hidden";
        }
        document.getElementById (this.id[3]).style.display = "initial";
        document.getElementById (this.id[3]).style.visibility = "visible";
        document.getElementById (this.id[4]).style.color = "var(--color-primary)";
    }

    open () {
        for (let i = 0; i < 2; i++) {
            document.getElementById (this.id[i]).style.display = "flex";
            document.getElementById (this.id[i]).style.visibility = "visible";
        }
        document.getElementById (this.id[2]).style.display = "block";
        document.getElementById (this.id[2]).style.visibility = 'visible';
        document.getElementById (this.id[3]).style.display = "none";
        document.getElementById (this.id[3]).style.visibility = "hidden";
        document.getElementById (this.id[4]).style.color = "var(--color-secondary)";
      }
}
