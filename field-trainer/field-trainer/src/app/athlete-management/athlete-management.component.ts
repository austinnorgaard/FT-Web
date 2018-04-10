import { Component, OnInit } from "@angular/core";
import { TeamManagementService } from "../api/team-management.service";
import { Team } from "../../../../../smart-cone-api/src/Teams/team";
import { TeamModel } from "../models/team";
import { AthleteModel } from "../models/athlete";
import { AthleteRegistrationModel } from "../models/athlete-registration";

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

    athlete: AthleteModel = new AthleteModel();
    athleteForSubmission: AthleteModel = new AthleteModel();

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

    validateParent(): boolean {
        // Null out parent fields if they are not set
        if (
            this.athleteForSubmission.parent1.name &&
            this.athleteForSubmission.parent1.name.length > 1
        ) {
            // if set, validate the rest of the fields
            // phone and email must be set
            if (
                !this.athleteForSubmission.parent1.phone ||
                this.athleteForSubmission.parent1.phone.length < 1
            ) {
                console.log(
                    "Error: If parent 1 name is set, phonenumber should be set too"
                );
                return false;
            }

            if (
                !this.athleteForSubmission.parent1.email ||
                this.athleteForSubmission.parent1.email.length < 1
            ) {
                console.log(
                    "Error: If parent 1 name is set, email should be set too"
                );
                return false;
            }
        } else {
            // not being used
            this.athleteForSubmission.parent1 = null;
        }

        if (
            this.athleteForSubmission.parent2.name &&
            this.athleteForSubmission.parent2.name.length > 1
        ) {
            // if set, validate the rest of the fields
            // phone and email must be set
            if (
                !this.athleteForSubmission.parent2.phone ||
                this.athleteForSubmission.parent2.phone.length < 1
            ) {
                console.log(
                    "Error: If parent 2 name is set, phonenumber should be set too"
                );
                return false;
            }

            if (
                !this.athleteForSubmission.parent2.email ||
                this.athleteForSubmission.parent2.email.length < 1
            ) {
                console.log(
                    "Error: If parent 2 name is set, email should be set too"
                );
                return false;
            }
        } else {
            this.athleteForSubmission.parent2 = null;
        }

        return true;
    }

    onSubmit() {
        // create a copy of the athlete so we can muck with its fields
        Object.assign(this.athleteForSubmission, this.athlete);

        if (!this.validateParent()) {
            return;
        }

        console.log(this.athleteForSubmission);

        // create registration data
        let registrationData = {
            athlete: this.athleteForSubmission,
            team: this.selectedTeam
        } as AthleteRegistrationModel;

        console.log("Team for submission");
        console.log(registrationData);
    }
}
