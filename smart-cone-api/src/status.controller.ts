import { Controller, Get } from "@nestjs/common";

@Controller("status")
export class StatusController {
    // Basic route which a client can hit to ensure the whole application is up
    @Get()
    getStatus(): string {
        return "up";
    }
}
