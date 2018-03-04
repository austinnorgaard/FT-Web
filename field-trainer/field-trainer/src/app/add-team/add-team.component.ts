import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ft-add-team",
    templateUrl: "./add-team.component.html",
    styleUrls: ["./add-team.component.css"]
})
export class AddTeamComponent implements OnInit {
    ageGroups: string[] = ["11-13", "13-15", "15-17"];

    constructor() {}

    ngOnInit() {}

    onClick(): void {
        console.log("Hello, world!");
    }
}
