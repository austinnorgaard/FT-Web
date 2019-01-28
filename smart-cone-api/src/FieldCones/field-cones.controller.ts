import { Controller, Get } from "@nestjs/common";
import { FieldConesService } from "./field-cones.service";
import { FieldConeInfo, FieldConeInfoArray } from "./field-cone-info";

@Controller("field-cones")
export class FieldConesController {
    constructor(private fieldConesService: FieldConesService) {}

    @Get()
    getCones(): FieldConeInfoArray {
        return { items: this.fieldConesService.connectedFieldCones.getValue() };
    }
}
