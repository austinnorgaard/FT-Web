import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { FieldCone } from "../models/field-cone";
import { BehaviorSubject } from "rxjs";
import { SocketMessageBrokerService } from "../../socket-message-broker/socket-message-broker.service";
import { IsArray, ValidateNested } from "../../../../../../smart-cone-api/node_modules/class-validator";
import { Type } from "../../../../../../smart-cone-api/node_modules/class-transformer";

export class FieldConesArray {
    @IsArray()
    @ValidateNested()
    @Type(() => FieldCone)
    items: Array<FieldCone>;
}

@Injectable({ providedIn: "root" })
export class FieldConesService {
    // A behavior subject which represents the currently connected field cones
    // The backend will update us as they come in, observers of this subject can then know
    // when field cones have connected and react appropriately
    public fieldConesSubject: BehaviorSubject<FieldCone[]> = new BehaviorSubject([]); // start off with no known cones

    constructor(private readonly http: HttpHelperService, private readonly socket: SocketMessageBrokerService) {
        console.log("Field cones service!");

        this.socket.broker.RegisterEventObservable("fieldConesConnected", FieldConesArray).subscribe((cones: FieldConesArray) => {
            console.log(cones.items);
            this.fieldConesSubject.next(cones.items);
        });
    }
    async updateFieldCones(): Promise<void> {
        const cones = await this.getFieldCones();
        this.fieldConesSubject.next(cones);
    }

    async getFieldCones(): Promise<FieldCone[]> {
        const cones = await this.http.get<FieldConesArray>("/field-cones");
        return cones.items;
    }

    async setFieldConeId(fieldCone: FieldCone): Promise<void> {
        await this.http.post<FieldCone>("/field-cones", fieldCone);
    }

    async coneMakeNoise(fieldCone: FieldCone): Promise<void> {
        await this.http.post<FieldCone>("/field-cones/noise", fieldCone);
    }
}
