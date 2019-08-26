export abstract class BaseAudioService {
    abstract PlayAction(action: string): void;
    abstract SetAction(action: string): void;
    abstract PlayTestAudio(): void;
}
