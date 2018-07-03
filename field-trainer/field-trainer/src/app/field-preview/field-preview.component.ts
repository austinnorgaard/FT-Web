import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from "@angular/core";
import { Point } from "../models/point";
import { FieldDrawable } from "../field-drawable/field-drawable";
import { FieldsService } from "../api/fields.service";
import { Field } from "../models/field";
import { Course } from "../models/course";

@Component({
    selector: "ft-field-preview",
    templateUrl: "./field-preview.component.html",
    styleUrls: ["./field-preview.component.css"],
})
export class FieldPreviewComponent implements OnInit {
    @ViewChild("fieldCanvas") canvasRef: ElementRef;

    private field: FieldDrawable;

    constructor(private fieldService: FieldsService) {}

    ngOnInit() {
        this.field = new FieldDrawable(this.canvasRef);
    }

    public resize(width: number, height: number) {
        this.field.resize(height, height);
    }

    public loadField(field: Field, width: number, height: number) {
        this.field.loadField(field, width, height);
    }

    public loadCourse(course: Course) {
        this.field.loadCourse(course);
    }

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        console.log("resize!");
    }
}
