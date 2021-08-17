/// Provides an extremely simple, permissive agent. Automatically approves any request
/// without any input or output required, so it is suitable for automation environments

import * as dbus from "dbus-next";

let {
    Interface
} = dbus.interface;

export class FTAgent extends Interface {
    Release() {
        console.log("Agent Release called");
    }

    RequestPinCode(device: Object): String {
        console.log(`Agent request pin code called with device: ${device}`);
        return "1234";
    }

    DisplayPinCode(device: Object, code: String) {
        console.log(`Agent display pin code, with device: ${device} and code ${code}`);
    }

    RequestPasskey(device: Object): number {
        console.log(`Agent requesting pass key with device ${device}`);
        return 1234;
    }

    DisplayPasskey(device: Object, passkey: number, entered: number) {
        console.log(`Agent Display Passkey with device: ${device}, passkey: ${passkey} and entered: ${entered}`);
    }

    RequestConfirmation(device: Object, passkey: number) {
        console.log(`Agent Request Confirmation with device: ${device} and passkey: ${passkey}`);
    }

    RequestAuthorization(device: Object) {
        console.log(`Agent request authorization with device: ${device}`);
    }

    AuthorizeService(device: Object, uuid: String) {
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
        Release: {
        },
        RequestPinCode: {
            inSignature: 'a{sv}',
            outSignature: 's',
        },
        DisplayPinCode: {
            inSignature: 'a{sv}s',
        },
        RequestPasskey: {
            inSignature: 'a{sv}',
            outSignature: 'u'
        },
        DisplayPasskey: {
            inSignature: 'a{sv}uq'
        },
        RequestConfirmation: {
            inSignature: 'a{sv}u'
        },
        RequestAuthorization: {
            inSignature: 'a{sv}'
        },
        AuthorizeService: {
            inSignature: 'a{sv}s'
        },
        Cancel: {

        }
    }
})

export async function registerAgent(agent: FTAgent) {
    // Make BlueZ aware of @agent
    let bluez = await dbus.systemBus().getProxyObject("org.bluez", "/org/bluez");
    if (!bluez) {
        throw new Error("Not able to get BlueZ dbus access. Permissions, or is bluetooth disabled?");
    }

    let agentManager = bluez.getInterface("org.bluez.AgentManager1");
    await agentManager.RegisterAgent(agent.GetObjectPath(), "NoInputNoOutput");
}

export async function setDefaultAgent(agent: FTAgent) {
    // Request @agent be the default agent for this application
}