import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, NgZone } from "@angular/core";
import { Field } from "../models/field";
import { FieldsService } from "../api/fields.service";
import { FieldPreviewComponent } from "../field-preview/field-preview.component";
import { Course } from "../models/course";
import { Router } from "@angular/router";
import { SessionService } from "../api/session.service";

@Component({
    selector: "ft-field-course-setup",
    templateUrl: "./field-course-setup.component.html",
    styleUrls: ["./field-course-setup.component.css"],
})
export class FieldCourseSetupComponent implements AfterViewInit, OnInit {
    @ViewChild("fieldPreviewDiv") fieldPreviewDiv: ElementRef;
    @ViewChild("fieldPreview") fieldPreview: FieldPreviewComponent;
    selectedField: Field = null;
    selectedCourse: Course;
    fields: Field[] = null;
    courses: Course[] = null;
    loadedExistingData = false;

    constructor(private fieldsService: FieldsService, private router: Router, private sessionService: SessionService) {
        this.getFields();
    }

    // Set state from current state in service
    async ngOnInit() {
        console.log("Field-Course-Setup Init");
        // Get the current state in case we have navigated back
        const state = this.sessionService.getCurrentSessionSetupState();
        this.selectedField = state.field;
        this.selectedCourse = state.course;
        if (this.selectedField) {
            this.loadedExistingData = true;
        }

        console.log(this.selectedCourse, this.selectedField);
    }

    async ngAfterViewInit() {
        if (this.loadedExistingData) {
            if (this.selectedField) {
                this.loadFieldPreview();
                if (this.selectedCourse) {
                    // make sure the courses got loaded, otherwise it wont appear in the list
                    this.getCourses().then(() => {
                        this.fieldPreview.loadCourse(this.selectedCourse);
                    });
                }
            }
        }
    }

    fieldCompareFn(o1: Field, o2: Field): boolean {
        if (!o1 || !o2) {
            return false;
        }

        return o1.name === o2.name;
    }

    courseCompareFn(o1: Course, o2: Course): boolean {
        if (!o1 || !o2) {
            return false;
        }
        return o1.name === o2.name;
    }

    onClick() {
        this.router.navigateByUrl("session-setup/athlete-select");
    }

    onFieldChanged() {
        this.getCourses();
        this.loadFieldPreview();
        this.sessionService.setFieldAndCourse(this.selectedField, this.selectedCourse);
    }

    loadFieldPreview() {
        const width = this.fieldPreviewDiv.nativeElement.offsetWidth;
        const height = this.fieldPreviewDiv.nativeElement.offsetHeight;
        this.fieldPreview.loadField(this.selectedField, width, height);
    }

    onCourseChanged() {
        this.fieldPreview.loadCourse(this.selectedCourse);
        this.sessionService.setFieldAndCourse(this.selectedField, this.selectedCourse);
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
