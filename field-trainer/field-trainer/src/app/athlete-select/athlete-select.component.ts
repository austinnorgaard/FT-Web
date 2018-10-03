import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "ft-athlete-select",
    templateUrl: "./athlete-select.component.html",
    styleUrls: ["./athlete-select.component.css"],
})
export class AthleteSelectComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    onClick() {
        this.router.navigateByUrl("/session-setup/field-select");
    }
}
