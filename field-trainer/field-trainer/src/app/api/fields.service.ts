import { Injectable } from "@angular/core";
import { Field } from "../models/field";
import { getMockFields, mockField1Courses } from "../mocks/mock-field-data";
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
            resolve(mockField1Courses);
        });
    }
}
