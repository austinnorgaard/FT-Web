import { BaseAudioService } from "./base-audio.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MockAudioService implements BaseAudioService {
    PlayTestAudio(): void {
        console.log("Would've played the test audio here!! But this is the mock class");
    }

    SetAction(action: string): void {
        console.log(`Wouldve set audio action here to: ${action}`);
    }
    constructor() {
        console.log("Using Mock Audio service, because we are not on a target platform");
    }

    PlayAction(): void {
        console.log(`MockAudio: Would've played audio for action`);
    }
}
