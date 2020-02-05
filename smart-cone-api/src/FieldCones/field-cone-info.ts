import * as io from "socket.io-client";
import { AnonymousSubject } from "rxjs/internal/Subject";

// A model of a field cone
// This is the information the Field Cone will provide
// early in the connection process which identifies the cone

export class FieldConeInfo {
    ip: string;
    id: number;
    sessionId: string; // the socket session id, unique identifier per session

    // Latency results for this FieldCone
    latencyResults: Array<number>;

    latencyStartTime: Date;

    version: FieldConeVersion;
}

export class FieldConeClient {
    id: number;
    client: any;
}

// TODO: Auto-detect the actual names
export class FieldConeVersion {
    fieldCone: number;
    fieldConeSystem: number;
    audioFiles: number;
}

export class BuildsJsonFormat {
    packages: Array<BuildFormat>;
}

export class BuildFormat {
    name: string;
    version: number;
}

export class FieldConeInfoArray {
    items: Array<FieldConeInfo>;
}
