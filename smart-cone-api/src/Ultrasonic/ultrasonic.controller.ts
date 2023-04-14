import { Controller, Post } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";
import { emitKeypressEvents } from "readline";
import { MockUltrasonicService } from "./mock-ultrasonic.service";

/// provides a helper endpoint to simulate ultrasonic events
@Controller("ultrasonic")
export class UltrasonicController {
    private mockUltrasonicService: MockUltrasonicService = null;
    constructor(ultraSonicService: BaseUltrasonicService) {
        this.mockUltrasonicService = ultraSonicService as MockUltrasonicService;
    }

    @Post("test")
    public emitEvent() {
        this.mockUltrasonicService.UltrasonicEvent.next();
    }
}