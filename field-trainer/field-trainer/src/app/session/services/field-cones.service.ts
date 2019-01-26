import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { FieldCone } from "../models/field-cone";
import { BehaviorSubject } from "rxjs";
import { SocketMessageBrokerService } from "../../socket-message-broker/socket-message-broker.service";
import { IsArray } from "class-validator";

export class FieldConesDto {
    @IsArray() cones: FieldCone[];
}

@Injectable({ providedIn: "root" })
export class FieldConesService {
    // A behavior subject which represents the currently connected field cones
    // The backend will update us as they come in, observers of this subject can then know
    // when field cones have connected and react appropriately
    public fieldConesSubject: BehaviorSubject<FieldCone[]> = new BehaviorSubject([]); // start off with no known cones

    constructor(private readonly http: HttpHelperService, private readonly socket: SocketMessageBrokerService) {
        console.log("Field cones service!");
        /*         this.socket.broker.RegisterEventObservable<FieldCone[]>("fieldConesConnected", Array<FieldCone>).subscribe(cones: FieldCone[] => {

            console.log(`Received new field cones from backend. ${JSON.stringify(cones)}`);

            this.fieldConesSubject.next(cones);

        }); */
        this.socket.broker.RegisterEventObservable<FieldConesDto>("fieldConesConnected", FieldConesDto).subscribe(cones => {
            console.log("got some cones!");
        });
    }

    async updateFieldCones(): Promise<void> {
        const cones = await this.getFieldCones();
        this.fieldConesSubject.next(cones);
    }

    async getFieldCones(): Promise<FieldCone[]> {
        const cones = await this.http.get<FieldCone[]>("/field-cones");
        return cones;
    }
}
