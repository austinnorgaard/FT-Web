import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FieldDrawable } from "../field-drawable/field-drawable";
import { Point } from "../models/point";

@Component({
    selector: "ft-field-preview",
    templateUrl: "./field-preview.component.html",
    styleUrls: ["./field-preview.component.css"],
})
export class FieldPreviewComponent implements OnInit {
    @ViewChild("fieldPreviewCanvas") canvasRef: ElementRef;
    private fieldDrawable: FieldDrawable = null;
    private points: Point[];
    constructor() {
        this.points = [
            {
                x: 0,
                y: 0,
            },
            {
                x: 5,
                y: 10,
            },
            {
                x: 5,
                y: 20,
            },
            {
                x: 10,
                y: 20,
            },
        ];
    }

    ngOnInit() {
        // For testing, use football field dimensions
        this.fieldDrawable = new FieldDrawable(this.canvasRef, 50, 103);
    }
}
