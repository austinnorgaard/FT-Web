import { Component, Input } from "@angular/core";
import { Cone } from "../data/cone";

@Component({
    selector: "ft-cone",
    templateUrl: "./cone.component.html",
    styleUrls: ["./cone.component.css"]
})
export class ConeComponent {
    @Input() cone: Cone;
}
