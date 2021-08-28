import * as dbus from "dbus-next";
import { GattCharacteristic } from "./characteristic";
import { CharacteristicFlag, DescriptorFlag, ReadFlags, shortGattUuidToLong, WriteFlags } from "./shared";

let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;

export class GattService extends Interface {
    constructor(uuid: string, primary: boolean, applicationPath: string, private readonly characteristics: GattCharacteristic[] = []) {
        super("org.bluez.GattService1");
        this.UUID = shortGattUuidToLong(uuid);
        this.Primary = primary;
        this.Service = `${applicationPath}/${uuid}`;
    }

    Register(bus: dbus.MessageBus) {
        bus.export(this.Service, this);
    }

    GetCharacteristics(): GattCharacteristic[] {
        return this.characteristics;
    }

    ToDBusObject(): any {
        return {
            "org.bluez.GattService1": {
                UUID: new dbus.Variant("s", this.UUID),
                Primary: new dbus.Variant("b", this.Primary),
            },
        };
    }

    GetObjectPath(): string {
        return this.Service;
    }

    readonly UUID: string;
    readonly Primary: boolean;

    private Service: string;
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
