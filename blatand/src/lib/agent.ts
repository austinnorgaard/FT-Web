/// Provides an extremely simple, permissive agent. Automatically approves any request
/// without any input or output required, so it is suitable for automation environments

import * as dbus from "dbus-next";
import { GetDBusInterface } from "./shared";

let { Interface } = dbus.interface;

export class FTAgent extends Interface {
    constructor(private readonly objectPath: string, private readonly bus: dbus.MessageBus) {
        super("org.bluez.Agent1");
    }

    /// org.bluez.Agent1 Interface
    /// --------------
    Release() {
        console.log("Agent Release");
    }

    RequestPinCode(device: String): String {
        console.log(`Agent request pin code called with device: ${device}`);
        return "1234";
    }

    DisplayPinCode(device: String, code: String) {
        console.log(`Agent display pin code, with device: ${device} and code ${code}`);
    }

    RequestPasskey(device: String): number {
        console.log(`Agent requesting pass key with device ${device}`);
        return 1234;
    }

    DisplayPasskey(device: String, passkey: number, entered: number) {
        console.log(`Agent Display Passkey with device: ${device}, passkey: ${passkey} and entered: ${entered}`);
    }

    RequestConfirmation(device: String, passkey: number) {
        console.log(`Agent Request Confirmation with device: ${device} and passkey: ${passkey}`);
    }

    RequestAuthorization(device: String) {
        console.log(`Agent request authorization with device: ${device}`);
    }

    AuthorizeService(device: String, uuid: String) {
        console.log(`Agent request authorize service with device: ${device} and uuid: ${uuid}`);
    }

    Cancel() {
        console.log("Agent request Cancel");
    }

    /// End user API
    /// -------------

    GetObjectPath() {
        return this.objectPath;
    }

    /// Make BlueZ aware of this agent implementation
    async Register() {
        // Add this object to the bus
        this.bus.export(this.objectPath, this);

        let agentManager = await GetDBusInterface(this.bus, "org.bluez", "/org/bluez", "org.bluez.AgentManager1");
        await agentManager.RegisterAgent(this.objectPath, "NoInputNoOutput");
    }

    /// Remove this agent from BlueZ
    async Unregister() {
        let agentManager = await GetDBusInterface(this.bus, "org.bluez", "/org/bluez", "org.bluez.AgentManager1");
        await agentManager.UnregisterAgent(this.objectPath);
        this.bus.unexport(this.objectPath, this);
    }

    /// Make this agent the default agent for all pairing operations
    async SetDefault() {
        let agentManager = await GetDBusInterface(this.bus, "org.bluez", "/org/bluez", "org.bluez.AgentManager1");
        await agentManager.RequestDefaultAgent(this.objectPath);
    }
}

FTAgent.configureMembers({
    methods: {
        Release: {},
        RequestPinCode: {
            inSignature: "o",
            outSignature: "s",
        },
        DisplayPinCode: {
            inSignature: "os",
        },
        RequestPasskey: {
            inSignature: "o",
            outSignature: "u",
        },
        DisplayPasskey: {
            inSignature: "ouq",
        },
        RequestConfirmation: {
            inSignature: "ou",
        },
        RequestAuthorization: {
            inSignature: "o",
        },
        AuthorizeService: {
            inSignature: "os",
        },
        Cancel: {},
    },
});
