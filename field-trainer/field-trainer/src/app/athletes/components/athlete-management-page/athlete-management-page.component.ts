import { Component, OnInit } from "@angular/core";
import { AthleteManagementService } from "../../services/athlete-management.service";
import { AthleteModel } from "../../models/athlete";
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
        this.athletesService
            .removeAthlete(athlete.id)
            .then(response => {
                // remove the athlete from the current list of athletes
                const index = this.athletes.findIndex(a => {
                    return a.id === athlete.id;
                });

                if (index === -1) {
                    console.log("Internal error, findIndex returned -1! Fix this!");
                    return;
                }

                this.athletes.splice(index, 1);
            })
            .catch(err => {
                console.log(`Could not remove athlete. Reason: ${err}`);
            });
    }

    addAthlete() {
        this.router.navigateByUrl("/add-athlete");
    }
}
