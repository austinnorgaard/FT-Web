import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Field } from "../models/field";
import { FieldsService } from "../api/fields.service";
import { FieldPreviewComponent } from "../field-preview/field-preview.component";
import { Course } from "../models/course";
import { Router } from "@angular/router";

@Component({
    selector: "ft-field-course-setup",
    templateUrl: "./field-course-setup.component.html",
    styleUrls: ["./field-course-setup.component.css"],
})
export class FieldCourseSetupComponent implements AfterViewInit {
    @ViewChild("fieldPreviewDiv") fieldPreviewDiv: ElementRef;
    @ViewChild("fieldPreview") fieldPreview: FieldPreviewComponent;
    selectedField: Field = null;
    selectedCourse: Course;
    fields: Field[] = null;
    courses: Course[] = null;

    constructor(private fieldsService: FieldsService, private router: Router) {
        this.getFields();
    }

    ngAfterViewInit(): void {
        // Uncomment if we are going to default to a field
    }

    onClick() {
        this.router.navigateByUrl("session-setup/athlete-select");
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
