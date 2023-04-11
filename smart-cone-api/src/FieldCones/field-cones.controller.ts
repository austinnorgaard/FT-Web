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
        console.log(`Sending to: http://${body.ip}:6000/comms/id`);
        await this.http.post(`http://${body.ip}:6000/comms/id`, { id: body.id }).toPromise();
    }

    @Post("noise")
    async makeNoise(@Body() body: FieldConeInfo) {
        console.log(`Telling cone at ${body.ip} to make a noise!`);
        await this.http.post(`http://${body.ip}:6000/audio/test-noise`, {}).toPromise();
    }

    @Post("update")
    async updateCone(@Body() body: FieldConeInfo) {
        // Just inform the cone they need to update, don't care about getting a response
        // response is likely a 500 anyway as the cone is rebooting
        try {
            const cone = this.fieldConesService.connectedFieldCones.getValue().find(c => {
                return c.id === body.id;
            });
            if (cone) {
                console.log(`Attempting to update cone with ID ${body.id}`);
                await this.http.post(`http://${cone.ip}:6000/comms/update`).toPromise();
            }
        } catch (err) {
            // dont care
        }
    }
}
