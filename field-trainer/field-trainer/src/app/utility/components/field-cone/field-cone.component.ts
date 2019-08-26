import { Component, OnInit, Input } from "@angular/core";
import { FieldCone } from "../../../session/models/field-cone";
import { FieldConesService } from "../../../session/services/field-cones.service";

@Component({
    selector: "ft-field-cone",
    templateUrl: "./field-cone.component.html",
    styleUrls: ["./field-cone.component.css"],
})
export class FieldConeComponent implements OnInit {
    @Input() public coneInfo: FieldCone;
    public newId: string = "";
    constructor(private readonly fieldConesService: FieldConesService) {}

    ngOnInit() {}

    makeNoise() {
        console.log(`Cone ID ${this.coneInfo.id} making a noise`);
        this.fieldConesService.coneMakeNoise(this.coneInfo);
    }

    async changeId() {
        // Check if the user gave us a legit number
        if (this.newId === "") {
            console.log("No ID set!");
        }

        const id = parseInt(this.newId);

        if (isNaN(id)) {
            console.log(`The supplied ID: ${this.newId} is not parsable to a number!`);
        }

        console.log(`Setting the field cone at IP: ${this.coneInfo.ip} to id ${this.coneInfo.id}`);

        // Create a copy for now.. might be smart to just update our local copy but
        // if the changing of the id fails, it will be out of sync..
        const newConeInfo = this.coneInfo;
        newConeInfo.id = id;
        this.fieldConesService.setFieldConeId(newConeInfo);
    }
}
