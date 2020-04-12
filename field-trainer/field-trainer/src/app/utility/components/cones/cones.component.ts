import { Component, OnInit } from "@angular/core";
import { FieldConesService } from "../../../session/services/field-cones.service";
import { FieldCone } from "../../../session/models/field-cone";

@Component({
    selector: "ft-cones",
    templateUrl: "./cones.component.html",
    styleUrls: ["./cones.component.css"],
})
export class ConesComponent implements OnInit {
    public fieldCones: FieldCone[] = [];
    constructor(private readonly fieldConesService: FieldConesService) {
        fieldConesService.fieldConesSubject.asObservable().subscribe((cones: FieldCone[]) => {
            this.fieldCones = cones;
        });
        fieldConesService.updateFieldCones();
    }

    ngOnInit() {}

    trackByFn(index: any, item: any) {
        return index;
    }
}
