import * as dbus from "dbus-next";
import { CharacteristicFlag, DescriptorFlag, ReadFlags, WriteFlags } from "./shared";

let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;

export class GattService extends Interface {
    constructor(uuid: string, primary: boolean) {
        super("org.bluez.GattService1");
        this.UUID = uuid;
        this.Primary = primary;
    }

    readonly UUID: string;
    readonly Primary: boolean;
}

GattService.configureMembers({
    properties: {
        UUID: {
            signature: "s",
            access: "read",
        },
        Primary: {
            signature: "b",
            access: "read",
        },
    },
});
