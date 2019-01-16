import { Point } from "../session/models/point";
import { FieldCone } from "../session/models/field-cone";
import { Field } from "../session/models/field";
import { Course } from "../session/models/course";

export const mockPoints1: Point[] = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 5, y: 20 }, { x: 25, y: 40 }, { x: 45, y: 50 }, { x: 45, y: 90 }];

export const mockPoints2: Point[] = [{ x: 0, y: 0 }, { x: 20, y: 10 }, { x: 25, y: 20 }, { x: 30, y: 20 }, { x: 40, y: 50 }];

export const mockPoints3: Point[] = [{ x: 10, y: 10 }, { x: 30, y: 10 }, { x: 60, y: 10 }, { x: 70, y: 30 }, { x: 70, y: 50 }, { x: 30, y: 50 }];

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

export function getMockCones3(): FieldCone[] {
    let i = 0;
    return mockPoints3.map(p => {
        return new FieldCone(i++, { x: p.x, y: p.y });
    });
}

export function getMockFields(): Field[] {
    return [
        new Field(getMockCones1(), 54, 102, "Football Field 1"),
        new Field(getMockCones2(), 54, 102, "Football Field 2"),
        new Field(getMockCones3(), 80, 60, "Senior Soccer Half Field"),
    ];
}

export const mockCourses: Course[] = [
    {
        name: "Conditioning",
        field: new Field(getMockCones3(), 80, 60, "Senior Soccer Half Field"),
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
                action: "sprint",
            },
            {
                from: 2,
                to: 3,
                action: "sprint",
            },
            {
                from: 3,
                to: 4,
                action: "run",
            },
            {
                from: 4,
                to: 5,
                action: "run",
            },
            {
                // return action
                from: 5,
                to: 0,
                action: "jog",
            },
        ],
    },
    {
        name: "Conditioning",
        field: new Field(getMockCones1(), 54, 102, "Football Field 1"),
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
            {
                // return action
                from: 5,
                to: 0,
                action: "jog",
            },
        ],
    },
    {
        name: "Cool down",
        field: new Field(getMockCones2(), 54, 102, "Football Field 2"),
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
