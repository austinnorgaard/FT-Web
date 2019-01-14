import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { FieldCone } from "../models/field-cone";

@Injectable({ providedIn: "root" })
export class FieldConesService {
    constructor(private readonly http: HttpHelperService) {}

    async getFieldCones(): Promise<FieldCone[]> {
        const cones = await this.http.get<FieldCone[]>("/field-cones");
        return cones;
    }
}
