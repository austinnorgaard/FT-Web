import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../misc/services/http-helper.service";

@Injectable()
export class SmartConeUpdateService {
    constructor(private readonly http: HttpHelperService) {}

    async updateSmartCone(): Promise<void> {
        return await this.http.post<void>("/update", {});
    }
}
