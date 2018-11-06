import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject, Component } from "@angular/core";

export interface YesNoDialogData {
    yes: boolean;
    no: boolean; // Ergonomics? Haha
    message: string;
}

@Component({
    selector: "ft-yes-no-dialog",
    templateUrl: "./yes-no-dialog.component.html",
})
export class YesNoDialogComponent {
    constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData) {}

    onNoClick(): void {
        this.data.no = true;
        this.data.yes = false;
        this.dialogRef.close(this.data);
    }

    onYesClick(): void {
        this.data.no = false;
        this.data.yes = true;
        this.dialogRef.close(this.data);
    }
}
