/// Provides an extremely simple, permissive agent. Automatically approves any request
/// without any input or output required, so it is suitable for automation environments

import * as dbus from "dbus-next";

let { Interface } = dbus.interface;

export class FTAgent extends Interface {
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

    GetObjectPath() {
        return "/fieldtrainer/agent";
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

export async function registerAgent(agent: FTAgent, bus: dbus.MessageBus) {
    // Make BlueZ aware of @agent
    let bluez = await bus.getProxyObject("org.bluez", "/org/bluez");
    if (!bluez) {
        throw new Error("Not able to get BlueZ dbus access. Permissions, or is bluetooth disabled?");
    }

    let agentManager = bluez.getInterface("org.bluez.AgentManager1");
    let result = await agentManager.RegisterAgent(agent.GetObjectPath(), "NoInputNoOutput");
    console.log("Register Agent Result: ", result);
}

export async function unregisterAgent(agent: FTAgent, bus: dbus.MessageBus) {
    try {
        let bluez = await bus.getProxyObject("org.bluez", "/org/bluez");
        let agentManager = bluez.getInterface("org.bluez.AgentManager1");
        await agentManager.UnregisterAgent(agent.GetObjectPath());
        bus.unexport(agent.GetObjectPath(), agent);
    } catch (err) {
        console.log("Swallowing unregister agent error");
    }
}

export async function setDefaultAgent(agent: FTAgent, bus: dbus.MessageBus) {
    // Request @agent be the default agent for this application
    let bluez = await bus.getProxyObject("org.bluez", "/org/bluez");
    if (!bluez) {
        throw new Error("Not able to get BlueZ dbus access. Permissions, or is bluetooth disabled?");
    }

    let agentManager = bluez.getInterface("org.bluez.AgentManager1");
    let result = await agentManager.RequestDefaultAgent(agent.GetObjectPath());
    console.log("Default Agent Result: ", result);
}
