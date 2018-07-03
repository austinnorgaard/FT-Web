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
export class SessionSetupPageComponent implements AfterViewInit {
    @ViewChild("fieldPreviewDiv") fieldPreviewDiv: ElementRef;
    @ViewChild("fieldPreview") fieldPreview: FieldPreviewComponent;
    selectedField: Field;
    selectedCourse: Course;
    fields: Field[] = null;
    courses: Course[] = null;

    constructor(private fieldsService: FieldsService) {
        this.getFields();
    }

    ngAfterViewInit(): void {
        this.fieldPreview.resize(this.fieldPreviewDiv.nativeElement.offsetWidth, this.fieldPreviewDiv.nativeElement.offsetHeight);
    }

    onClick() {}

    onFieldChanged() {
        this.getCourses();

        const width = this.fieldPreviewDiv.nativeElement.offsetWidth;
        const height = this.fieldPreviewDiv.nativeElement.offsetHeight;
        this.fieldPreview.loadField(this.selectedField, width, height);
    }

    onCourseChanged() {
        this.fieldPreview.loadCourse(this.selectedCourse);
    }

    private getFields() {
        return this.fieldsService.getFields().then(fields => {
            this.fields = fields;
        });
    }

    private getCourses() {
        if (this.selectedField === null) {
            return;
        }

        return this.fieldsService.getCourses(this.selectedField).then(courses => {
            this.courses = courses;
        });
    }
}
