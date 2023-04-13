import { Post, Controller } from "@nestjs/common";
import { BaseUltrasonicService } from "./base-ultrasonic.service";
import { MockUltrasonicService } from "./mock-ultrasonic.service";

/**
 * This controller provides a simple REST interface for
 * simulating tilt events, making it a suitable replacement
 * for automated testing of tilt events in Field Trainer without
 * actually needing a tilt sensor!
 */
@Controller("test")
export class TestController {
    mockUltrasonicService: MockUltrasonicService = null;
    constructor(private readonly ultrasonicService: BaseUltrasonicService) {
        // We make a fairly hard assumption here that nobody is going to realistically
        // hit this controller unless they are testing on their non-Raspberry Pi device
        // so, we can assume that the incoming tiltService is actually a MockTiltService
        // which provides some useful test related methods!
        this.mockUltrasonicService = ultrasonicService as MockUltrasonicService;
    }

    @Post("ultrasonic")
    public ultrasonic() {
        this.mockUltrasonicService.emitUltrasonicEvent();
    }
}
