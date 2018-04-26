/* TeamManagementAthleteComponent
 * This component provides a rendered display of Athlete data
 * including various modes and events which are triggered
 * when actions occur in those modes.
 * 
 * Mode 1 (Add Mode) - This mode makes the assumption the user wants
 * the ability to add the athlete (to a team in team-management-page)
 * Athlete data is rendered, along with an "Add" button which generates
 * an event that can be attached to. For example, the team-management-page
 * component, we'd watch for this event to know when the user wants to add
 * this athlete to selected team
 * 
 * Mode 2 (Remove Mode) - Very similar to Mode 1, except the button generates
 * a Remove event, for when the user wants to remove the athlete from the
 * selected team.
 * 
 * Design: This component takes as input, a specific Athlete (type: AthleteModel).
 * The component also takes as input a mode in which to operate.
 * 
 * Ui: This component should be implemented with Material design in mind. We will expect
 * this 
 
 * 
 * Additional thoughts: We might want to have an "Edit" button which the upper
 * component can attach to, in order to pop some type of edit dialog, or
 * page redirection.
 * 
 * 
 */

import { Component, OnInit, Input, Output } from "@angular/core";
import { AthleteModel } from "../models/athlete";
import { EventEmitter } from "@angular/core";

@Component({
    selector: "ft-team-management-athlete",
    templateUrl: "./team-management-athlete.component.html",
    styleUrls: ["./team-management-athlete.component.css"]
})
export class TeamManagementAthleteComponent implements OnInit {
    @Input() athlete: AthleteModel;
    // "add" or "remove", anything else is invalid and may throw
    @Input() mode: string;

    @Output() added: EventEmitter<AthleteModel> = new EventEmitter<AthleteModel>();

    @Output() removed: EventEmitter<AthleteModel> = new EventEmitter<AthleteModel>();

    constructor() {}

    ngOnInit() {}

    add() {
        this.added.emit(this.athlete);
    }

    remove() {
        this.removed.emit(this.athlete);
    }
}
