import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, NgZone } from "@angular/core";
import { FieldPreviewComponent } from "../field-preview/field-preview.component";
import { Router } from "@angular/router";
import { Field } from "../../models/field";
import { Course } from "../../models/course";
import { FieldsService } from "../../services/fields.service";
import { SessionSetupService } from "../../services/session-setup.service";
import { FieldConesService } from "../../services/field-cones.service";
import { FieldCone } from "../../models/field-cone";

@Component({
    selector: "field-component",
    templateUrl: "./field.component.html",
    styleUrls: ["./field.component.css"],
})
export class FieldComponent implements AfterViewInit, OnInit {
    @ViewChild("fieldPreviewDiv", { static: true }) fieldPreviewDiv: ElementRef;
    @ViewChild("fieldPreview", { static: true }) fieldPreview: FieldPreviewComponent;
    selectedField: Field;
    selectedCourse: Course;
    fields: Field[];
    courses: Course[];
    loadedExistingData = false;
    numConnectedFieldCones = 0;

    constructor(
        private fieldsService: FieldsService,
        private router: Router,
        private sessionSetup: SessionSetupService,
        private fieldConesService: FieldConesService,
    ) {
        this.getFields();
    }

    // Set state from current state in service
    async ngOnInit() {
        // Get the current state in case we have navigated back
        const state = this.sessionSetup.getSessionSetupData();
        this.selectedField = state.field;
        this.selectedCourse = state.course;
        if (this.selectedField) {
            this.loadedExistingData = true;
        }

        console.log(this.selectedCourse, this.selectedField);

        // probe the backend for cones
        await this.fieldConesService.updateFieldCones();
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
        this.sessionSetup.setField(this.selectedField);
        this.sessionSetup.setCourse(this.selectedCourse);
    }

    loadFieldPreview() {
        const width = this.fieldPreviewDiv.nativeElement.offsetWidth;
        const height = this.fieldPreviewDiv.nativeElement.offsetHeight;
        this.fieldPreview.loadField(this.selectedField, width, height);
    }

    onCourseChanged() {
        this.fieldPreview.loadCourse(this.selectedCourse);
        this.sessionSetup.setField(this.selectedField);
        this.sessionSetup.setCourse(this.selectedCourse);
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