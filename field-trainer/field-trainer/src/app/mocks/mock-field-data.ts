import { Point } from "../session/models/point";
import { FieldCone } from "../session/models/field-cone";
import { Field } from "../session/models/field";
import { Course } from "../session/models/course";

export const mockPoints1: Point[] = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 5, y: 20 }, { x: 25, y: 40 }, { x: 45, y: 50 }, { x: 45, y: 90 }];

export const mockPoints2: Point[] = [{ x: 0, y: 0 }, { x: 20, y: 10 }, { x: 25, y: 20 }, { x: 30, y: 20 }, { x: 40, y: 50 }];

export const mockPoints3: Point[] = [{ x: 10, y: 10 }, { x: 30, y: 10 }, { x: 60, y: 10 }, { x: 70, y: 30 }, { x: 70, y: 50 }, { x: 30, y: 50 }];

export const mockPoints4: Point[] = [{ x: 10, y: 10 }, { x: 30, y: 10 }];

export const mockPoints5: Point[] = [{ x: 10, y: 10 }, { x: 30, y: 10 }, { x: 50, y: 10 }, { x: 50, y: 30 }, { x: 30, y: 30 }, { x: 10, y: 30 }];

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

export function getMockCones4(): FieldCone[] {
    let i = 0;
    return mockPoints4.map(p => {
        return new FieldCone(i++, { x: p.x, y: p.y });
    });
}

export function getDemoCones(): FieldCone[] {
    let i = 0;
    return mockPoints5.map(p => {
        return new FieldCone(i++, { x: p.x, y: p.y });
    });
}

export function getMockFields(): Field[] {
    return [
        new Field(getMockCones1(), 54, 102, "Football Field 1"),
        new Field(getMockCones2(), 54, 102, "Football Field 2"),
        new Field(getMockCones3(), 80, 60, "Senior Soccer Half Field"),
        new Field(getMockCones4(), 80, 60, "Developer Test Field"),
        new Field(getDemoCones(), 80, 60, "Demo Field"),
    ];
}

export const mockCourses: Course[] = [
    {
        name: "Conditioning",
        field: new Field(getMockCones3(), 80, 60, "Senior Soccer Half Field"),
        conesSubset: [0, 1, 2, 3, 4, 5],
        segmentCollection: [
            {
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
        ],
    },
    {
        name: "Conditioning",
        field: new Field(getMockCones1(), 54, 102, "Football Field 1"),
        conesSubset: [0, 1, 2, 3, 4, 5],
        segmentCollection: [
            {
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
        ],
    },
    {
        name: "Cool down",
        field: new Field(getMockCones2(), 54, 102, "Football Field 2"),
        conesSubset: [0, 1, 2],
        segmentCollection: [
            {
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
        ],
    },
    {
        name: "Mock Course",
        field: new Field(getMockCones4(), 80, 60, "Developer Test Field"),
        conesSubset: [0, 1],
        segmentCollection: [
            {
                segments: [
                    {
                        from: 0,
                        to: 1,
                        action: "jog",
                    },
                    {
                        from: 1,
                        to: 0,
                        action: "jog",
                    },
                ],
            },
            {
                segments: [
                    {
                        from: 0,
                        to: 1,
                        action: "sprint",
                    },
                    {
                        from: 1,
                        to: 0,
                        action: "sprint",
                    },
                ],
            },
        ],
    },
    {
        name: "DemoField",
        field: new Field(getDemoCones(), 80, 60, "Demo Field"),
        conesSubset: [0, 1, 2, 3, 4, 5],
        segmentCollection: [
            {
                segments: [
                    {
                        from: 0,
                        to: 1,
                        action: "high-knees",
                    },
                    {
                        from: 1,
                        to: 2,
                        action: "walking-lunge",
                    },
                    {
                        from: 2,
                        to: 3,
                        action: "back-pedal",
                    },
                    {
                        from: 3,
                        to: 4,
                        action: "high-skips",
                    },
                    {
                        from: 4,
                        to: 5,
                        action: "butt-kicks",
                    },
                    {
                        from: 5,
                        to: 0,
                        action: "jog",
                    },
                ],
            },
            {
                segments: [
                    {
                        from: 0,
                        to: 1,
                        action: "int-hip-rotation",
                    },
                    {
                        from: 1,
                        to: 2,
                        action: "ext-hip-rotation",
                    },
                    {
                        from: 2,
                        to: 3,
                        action: "karaoke-right",
                    },
                    {
                        from: 3,
                        to: 4,
                        action: "walking-lunge",
                    },
                    {
                        from: 4,
                        to: 5,
                        action: "karaoke-left",
                    },
                    {
                        from: 5,
                        to: 0,
                        action: "jog",
                    },
                ],
            },
            {
                segments: [
                    {
                        from: 0,
                        to: 1,
                        action: "side-shuffle-left",
                    },
                    {
                        from: 1,
                        to: 2,
                        action: "side-shuffle-right",
                    },
                    {
                        from: 2,
                        to: 3,
                        action: "back-pedal",
                    },
                    {
                        from: 3,
                        to: 4,
                        action: "bounds",
                    },
                    {
                        from: 4,
                        to: 5,
                        action: "back-pedal",
                    },
                    {
                        from: 5,
                        to: 0,
                        action: "sprint",
                    },
                ],
            },
        ],
    },
];
