import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AthleteModel } from "../models/athlete";
import { MatDialog } from "@angular/material";
import { YesNoDialogComponent } from "../dialogs/yes-no/yes-no-dialog.component";

@Component({
    selector: "ft-athlete",
    templateUrl: "./athlete.component.html",
    styleUrls: ["./athlete.component.css"],
})
export class AthleteComponent implements OnInit {
    @Input() public model: AthleteModel;

    @Output() moveUp: EventEmitter<AthleteModel>;
    @Output() moveDown: EventEmitter<AthleteModel>;
    @Output() setInactive: EventEmitter<AthleteModel>;

    constructor(public dialog: MatDialog) {}

    ngOnInit() {}

    onClickClear() {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            data: { message: "Are you sure you want to set this player to inactive?" },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }
}
