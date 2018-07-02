import { Point } from "../models/point";
import { FieldCone } from "../models/field-cone";
import { Field } from "../models/field";

export const mockPoints1: Point[] = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 5, y: 20 }, { x: 10, y: 20 }, { x: 52, y: 50 }, { x: 52, y: 100 }];

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
