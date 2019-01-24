import { Controller, Get, Post, Body, HttpException, HttpStatus, Response } from "@nestjs/common";
import { TrainingSessionSetup } from "./training-session-setup";
import { TrainingService } from "./training.service";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

/*
 * This controller is the endpoint for requests specific about
 * existing training sessions (the crux of this application). This includes
 * things such as starting a new session, starting players into their run,
 * canceling players who may need to drop out or be re-ordered, etc.
 */
@Controller("training")
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) {}
    // Potentially not very interesting, but maybe we can use this for debug
    @Get()
    async get() {
        return "Nothing for now!";
    }

    @Post("start-session")
    async submitSessionSettings(@Body() sessionData: TrainingSessionSetup) {
        this.trainingService.startSession(sessionData);
        return "Session data set!";
    }

    @Post("next-athlete-starting")
    async nextAthleteStarting() {
        const result = await this.trainingService.nextAthleteStarting();
        if (result) {
            return;
        } else {
            throw new HttpException("No Athletes Left!!", HttpStatus.NOT_FOUND);
        }
    }
}
