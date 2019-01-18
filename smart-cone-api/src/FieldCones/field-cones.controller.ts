import { Controller, Get } from "@nestjs/common";
import { FieldConesService } from "./field-cones.service";
import { FieldConeInfo } from "./field-cone-info";

@Controller("field-cones")
export class FieldConesController {
    constructor(private fieldConesService: FieldConesService) {}

    @Get()
    getCones(): FieldConeInfo[] {
        return this.fieldConesService.connectedFieldCones.getValue();
    }
}
