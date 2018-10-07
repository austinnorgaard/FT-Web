import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject, Component } from "@angular/core";

export interface YesNoDialogData {
    yes: boolean;
    no: boolean; // Ergonomics? Haha
}

@Component({
    selector: "ft-yes-no-dialog",
    templateUrl: "./yes-no-dialog.component.html",
})
export class YesNoDialogComponent {
    constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.dialogRef.close();
    }
}
