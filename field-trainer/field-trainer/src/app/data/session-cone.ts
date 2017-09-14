import { Cone } from './cone';

export class SessionCone {
    constructor(public cone?: Cone, public triggered?: boolean) {}

    // toJSON() {
    //     return {
    //         cone: this.cone,
    //         triggered: this.triggered
    //     };
    // }
}