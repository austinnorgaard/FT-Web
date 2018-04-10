import { Component, OnInit } from "@angular/core";
import { TeamManagementService } from "../api/team-management.service";
import { Team } from "../../../../../smart-cone-api/src/Teams/team";
import { TeamModel } from "../models/team";

@Component({
    selector: "ft-athlete-management",
    templateUrl: "./athlete-management.component.html",
    styleUrls: ["./athlete-management.component.css"]
})
export class AthleteManagementComponent implements OnInit {
    genders: string[] = ["Male", "Female"];
    heights: string[] = [
        `4'0"`,
        `4'1"`,
        `4'2"`,
        `4'3"`,
        `4'4"`,
        `4'5"`,
        `4'6"`,
        `4'7"`,
        `4'8"`,
        `4'9"`,
        `4'10"`,
        `4'11"`,
        `5'0"`,
        `5'1"`,
        `5'2"`,
        `5'3"`,
        `5'4"`,
        `5'5"`,
        `5'6"`,
        `5'7"`,
        `5'8"`,
        `5'9"`,
        `5'10"`,
        `5'11"`,
        `6'0"`,
        `6'1"`,
        `6'2"`,
        `6'3"`,
        `6'4"`,
        `6'5"`,
        `6'6"`,
        `6'7"`,
        `6'8"`,
        `6'9"`
    ];

    availableTeams: TeamModel[] = [];
    selectedTeam: TeamModel = null;

    constructor(private readonly teamService: TeamManagementService) {}

    ngOnInit() {
        // populate our available teams array when the data is ready
        this.populateTeams();
    }

    populateTeams() {
        this.teamService
            .getTeams()
            .then((teams: TeamModel[]) => {
                // it worked
                console.log(`Found ${teams.length} teams.`);
                this.availableTeams = teams;
            })
            .catch(err => {
                console.log(`Failed to query teams. Reason: ${err}`);
            });
    }
}
