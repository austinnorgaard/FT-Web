import { Injectable } from "@angular/core";
import { Field } from "../models/field";
import { getMockFields, mockCourses } from "../../mocks/mock-field-data";
import { Course } from "../models/course";

/*
/ API for retrieving fields and courses
*/

@Injectable()
export class FieldsService {
    constructor() {}

    getFields(): Promise<Field[]> {
        return new Promise((resolve, reject) => {
            resolve(getMockFields());
        });
    }

    getCourses(field: Field): Promise<Course[]> {
        return new Promise((resolve, reject) => {
            // resolve(mockField1Courses);
            // Find the course which matches this field
            const courses = mockCourses.filter(course => course.field.name === field.name);

            if (courses === undefined) {
                reject(`No courses found for field with name ${field.name}`);
            } else {
                resolve(courses);
            }
        });
    }
}
