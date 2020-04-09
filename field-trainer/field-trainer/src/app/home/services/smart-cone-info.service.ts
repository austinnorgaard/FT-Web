import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../misc/services/http-helper.service";

export interface Package {
    name: string;
    version: number;
}

export class SmartConeInfo {
    packages: Array<Package>;
}

@Injectable()
export class SmartConeInfoService {
    constructor(private readonly http: HttpHelperService) {}

    async getSmartConeInfo(): Promise<SmartConeInfo> {
        return await this.http.get<SmartConeInfo>("/info");
    }
}
