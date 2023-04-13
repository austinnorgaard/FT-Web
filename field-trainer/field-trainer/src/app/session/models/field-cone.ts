import { Point } from "./point";

/* represents a cone in the field
 */

export class FieldCone {
    constructor(
        public id?: number,
        public position?: Point,
        public ip?: string,
        public latencyResults?: number[],
        public version?: FieldConeVersion,
        public port?: number
    ) {}
}

export class FieldConeVersion {
    fieldCone: number;
    fieldConeSystem: number;
    audioFiles: number;
}
