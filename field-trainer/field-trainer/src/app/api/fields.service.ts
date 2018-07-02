import { Injectable } from "@angular/core";
import { Field } from "../models/field";
import { getMockFields } from "../mocks/mock-field-data";

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
}
