import * as dbus from "dbus-next";
import { CharacteristicFlag, DescriptorFlag, ReadFlags, WriteFlags } from "./shared";

let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;

export abstract class GattCharacteristic extends Interface {
    constructor(uuid: string, characteristicPath: string, flags: CharacteristicFlag[]) {
        super("org.bluez.GattCharacteristic1");
        this.UUID = uuid;
        this.Service = characteristicPath;
        this.Flags = flags;
    }

    abstract ReadValue(flags: ReadFlags): Promise<Buffer>;
    async _ReadValue(flags: ReadFlags): Promise<Buffer> {
        return this.ReadValue(flags);
    }

    abstract WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void>;
    async _WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void> {
        return this.WriteValue(bytes, flags);
    }

    abstract StartNotify(): void;
    _StartNotify(): void {
        this.StartNotify();
    }

    abstract StopNotify(): void;
    _StopNotify(): void {
        this.StopNotify();
    }

    readonly UUID: string;
    // object path to parent Service
    readonly Service: string;
    readonly Flags: CharacteristicFlag[];
}

GattCharacteristic.configureMembers({
    methods: {
        _ReadValue: {
            name: "ReadValue",
            inSignature: "a{sv}",
            outSignature: "ay",
        },
        _WriteValue: {
            name: "WriteValue",
            inSignature: "aya{sv}",
        },
        _StartNotify: {
            name: "StartNotify",
        },
        _StopNotify: {
            name: "StopNotify",
        },
    },
    properties: {
        UUID: {
            signature: "s",
            access: "read",
        },
        Service: {
            signature: "o",
            access: "read",
        },
        Flags: {
            signature: "as",
            access: "read",
        },
    },
});
