import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from "@angular/core";
import { Field } from "../models/field";
import { FieldsService } from "../api/fields.service";
import { FieldPreviewComponent } from "../field-preview/field-preview.component";
import { Course } from "../models/course";

@Component({
    selector: "ft-session-setup-page",
    templateUrl: "./session-setup-page.component.html",
    styleUrls: ["./session-setup-page.component.css"],
})
export class SessionSetupPageComponent implements OnInit, AfterViewInit {
    @ViewChild("fieldPreviewDiv") fieldPreviewDiv: ElementRef;
    @ViewChild("fieldPreview") fieldPreview: FieldPreviewComponent;

    selectedField: Field;
    selectedCourse: Course;
    constructor(private fieldsService: FieldsService) {
        this.getFields();
    }

    fields: Field[] = null;
    courses: Course[] = null;

    ngAfterViewInit(): void {
        this.fieldPreview.resize(this.fieldPreviewDiv.nativeElement.offsetWidth, this.fieldPreviewDiv.nativeElement.offsetHeight);
    }

    ngOnInit() {}

    @HostListener("window:resize", ["$event"])
    onResize(event) {}

    onClick() {
        // console.log(`${JSON.stringify(this.fieldPreviewDiv)}`);
        // console.log(`${this.fieldPreviewDiv.nativeElement.offsetWidth} x ${this.fieldPreviewDiv.nativeElement.offsetHeight}`);
    }

    getFields() {
        return this.fieldsService.getFields().then(fields => {
            this.fields = fields;
        });
    }

    getCourses() {
        if (this.selectedField === null) {
            return;
        }

        return this.fieldsService.getCourses(this.selectedField).then(courses => {
            this.courses = courses;
        });
    }

    onFieldChanged() {
        this.getCourses();

        const width = this.fieldPreviewDiv.nativeElement.offsetWidth;
        const height = this.fieldPreviewDiv.nativeElement.offsetHeight;
        this.fieldPreview.loadField(this.selectedField, width, height);
    }

    onCourseChanged() {
        this.fieldPreview.loadCourse(this.selectedCourse);
    }
}
