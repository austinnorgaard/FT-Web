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
        try {
            await this.http.post(`http://127.0.0.1:${body.port}/comms/id`, { id: body.id }).toPromise();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    @Post("noise")
    async makeNoise(@Body() body: FieldConeInfo) {
        try {
            await this.http.post(`http://127.0.0.1:${body.port}/audio/test-noise`, {}).toPromise();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    @Post("tilt")
    async makeTilt(@Body() body: FieldConeInfo) {
        try {
            await this.http.post(`http://127.0.0.1:${body.port}/test/tilt`, {}).toPromise();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    @Post("ultrasonic")
    async makeUltrasonic(@Body() body: FieldConeInfo) {
        try {
            await this.http.post(`http://127.0.0.1:${body.port}/test/ultrasonic`, {}).toPromise();
        } catch (err) {
            console.log(err);
            return undefined;
        }
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
                await this.http.post(`http://127.0.0.1:${cone.port}/comms/update`).toPromise();
            }
        } catch (err) {
            return undefined;
            // dont care
        }
    }
}
