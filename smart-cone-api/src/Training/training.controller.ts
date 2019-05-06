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
    get() {
        // return the current session state
        console.log("/training/get");
        //return this.trainingService.sessionState;
        return this.trainingService.trainingSessionState;
    }

    @Post("start-session")
    submitSessionSettings(@Body() sessionData: TrainingSessionSetup) {
        this.trainingService.startSession(sessionData);
    }

    @Post("save-results")
    async saveResults() {
        await this.trainingService.saveResults();
    }

    @Post("next-athlete-starting")
    async nextAthleteStarting() {
        try {
            const result = await this.trainingService.nextAthleteStarting();
            if (result) {
                console.log("Returning!");
                return;
            } else {
                console.log("Throwing!");
                throw new HttpException("No Athletes Left!!", HttpStatus.NOT_FOUND);
            }
        } catch (err) {
            console.log(`Something threw. Message ${err}`);
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
