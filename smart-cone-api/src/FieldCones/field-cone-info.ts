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
}

export class FieldConeClient {
    id: number;
    client: any;
}

export class FieldConeInfoArray {
    items: Array<FieldConeInfo>;
}
