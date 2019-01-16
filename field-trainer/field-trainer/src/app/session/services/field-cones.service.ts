import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { FieldCone } from "../models/field-cone";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class FieldConesService {
    // A behavior subject which represents the currently connected field cones
    // The backend will update us as they come in, observers of this subject can then know
    // when field cones have connected and react appropriately
    public fieldConesSubject: BehaviorSubject<FieldCone[]> = new BehaviorSubject([]); // start off with no known cones

    constructor(private readonly http: HttpHelperService) {}

    async getFieldCones(): Promise<FieldCone[]> {
        const cones = await this.http.get<FieldCone[]>("/field-cones");
        return cones;
    }
}
