import { Controller, Get, Post, HttpService, Body } from "@nestjs/common";
import { FieldConesService } from "./field-cones.service";
import { FieldConeInfo, FieldConeInfoArray } from "./field-cone-info";

@Controller("field-cones")
export class FieldConesController {
    constructor(private fieldConesService: FieldConesService, private http: HttpService) {}

    @Get()
    getCones(): FieldConeInfoArray {
        return { items: this.fieldConesService.connectedFieldCones.getValue() };
    }

    @Post()
    async putCone(@Body() body: FieldConeInfo) {
        // Take a FieldCone and resolve it: i.e. update the actual remote device
        // including our internal information
        // For now, just update the ID
        console.log(`Sending to: http://${body.ip}:6200/comms/id`);
        await this.http.post(`http://${body.ip}:6200/comms/id`, { id: body.id }).toPromise();
    }

    @Post("noise")
    async makeNoise(@Body() body: FieldConeInfo) {
        console.log(`Telling cone at ${body.ip} to make a noise!`);
        await this.http.post(`http://${body.ip}:6200/audio/test-noise`, {}).toPromise();
    }
}
