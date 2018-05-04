import { Component, OnInit } from "@angular/core";
import { AthleteManagementService } from "../api/athlete-management.service";
import { AthleteModel } from "../models/athlete";
import { Router } from "@angular/router";

@Component({
    selector: "ft-athlete-management-page",
    templateUrl: "./athlete-management-page.component.html",
    styleUrls: ["./athlete-management-page.component.css"],
})
export class AthleteManagementPageComponent implements OnInit {
    public athletes: AthleteModel[] = [];
    constructor(private athletesService: AthleteManagementService, private router: Router) {}

    ngOnInit() {
        this.athletesService
            .getAthletes()
            .then((athletes: AthleteModel[]) => {
                this.athletes = athletes;
            })
            .catch(err => {
                console.log(`Error when retrieving athletes: ${err}`);
                this.athletes = [];
            });
    }

    onAthleteRemoved(athlete: AthleteModel) {
        console.log(`Removed athlete: ${athlete.firstName} ${athlete.lastName}`);
    }

    addAthlete() {
        this.router.navigateByUrl("/add-athlete");
    }
}
