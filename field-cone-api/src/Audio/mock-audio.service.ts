import { BaseAudioService } from "./base-audio.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MockAudioService implements BaseAudioService {
    constructor() {
        console.log("Using Mock Audio service, because we are not on a target platform");
    }

    PlayAction(action: string): void {
        console.log(`MockAudio: Would've played audio for action: ${action}`);
    }
}
