import { Point } from "../models/point";
import { FieldCone } from "../models/field-cone";
import { Field } from "../models/field";
import { Course } from "../models/course";

export const mockPoints1: Point[] = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 5, y: 20 }, { x: 25, y: 40 }, { x: 45, y: 50 }, { x: 45, y: 90 }];

export const mockPoints2: Point[] = [{ x: 0, y: 0 }, { x: 20, y: 10 }, { x: 25, y: 20 }, { x: 30, y: 20 }, { x: 40, y: 50 }];

export function getMockCones1(): FieldCone[] {
    let i = 0;
    return mockPoints1.map(p => {
        return new FieldCone(i++, { x: p.x, y: p.y });
    });
}

export function getMockCones2(): FieldCone[] {
    let i = 0;
    return mockPoints2.map(p => {
        return new FieldCone(i++, { x: p.x, y: p.y });
    });
}

export function getMockFields(): Field[] {
    return [new Field(getMockCones1(), 54, 102, "Football Field 1"), new Field(getMockCones2(), 54, 102, "Football Field 2")];
}

export const mockField1Courses: Course[] = [
    {
        name: "Conditioning",
        field: new Field(getMockCones1(), 54, 102, "Football field 2"),
        conesSubset: [0, 1, 2, 3, 4, 5],
        segments: [
            {
                from: 0,
                to: 1,
                action: "run",
            },
            {
                from: 1,
                to: 2,
                action: "jog",
            },
            {
                from: 2,
                to: 3,
                action: "side-step",
            },
            {
                from: 3,
                to: 4,
                action: "sprint",
            },
            {
                from: 4,
                to: 5,
                action: "walk",
            },
        ],
    },
    {
        name: "Cool down",
        field: getMockFields[1],
        conesSubset: [0, 1, 2],
        segments: [
            {
                from: 0,
                to: 1,
                action: "jog",
            },
            {
                from: 1,
                to: 2,
                action: "jog",
            },
        ],
    },
];
