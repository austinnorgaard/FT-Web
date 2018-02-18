import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ft-app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private router: Router) {
    this.router = router;
  }

  currentPath(): string {
    // take the router url and extract a pretty
    // path for our title bar
    var titleString = this.router.url.replace("/", " - ");
    return `FieldTrainer ${titleString}`;
  }
}
