import { Athlete } from "../../../../../smart-cone-api/src/Athletes/athlete";
import { ParentModel } from "./parent";

export class AthleteModel extends Athlete {
    constructor() {
        console.log("Constructing athlete model");
        super();
        this.parent1 = new ParentModel();
        this.parent2 = new ParentModel();
        console.log(this.parent1);
    }
}
