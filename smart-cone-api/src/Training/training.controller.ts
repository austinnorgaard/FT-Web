import { Controller, Get, Post, Body } from "@nestjs/common";
import { TrainingSessionSetup } from "./training-session-setup";

/*
 * This controller is the endpoint for requests specific about
 * existing training sessions (the crux of this application). This includes
 * things such as starting a new session, starting players into their run,
 * canceling players who may need to drop out or be re-ordered, etc.
 */
@Controller("training")
export class TrainingController {
    constructor() {}
    // Potentially not very interesting, but maybe we can use this for debug
    @Get()
    async get() {
        return "Nothing for now!";
    }

    @Post("start-session")
    async submitSessionSettings(@Body() sessionData: TrainingSessionSetup) {
        console.log(sessionData);
        return "Session data set!";
    }
}
