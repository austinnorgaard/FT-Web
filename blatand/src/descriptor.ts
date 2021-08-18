import * as dbus from "dbus-next";
import { DescriptorFlag, ReadFlags, WriteFlags } from "./shared";

let {
    Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE
} = dbus.interface;

export abstract class GattDescriptor extends Interface {
    constructor(uuid: string, descriptorPath: string, flags: DescriptorFlag[]) {
        super("org.bluez.GattDescriptor1");
        this.UUID = uuid;
        this.Characteristic = descriptorPath;
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

    readonly UUID: string;
    readonly Characteristic: string;
    // optional - cached value, is equal to the last value returned from ReadValue
    Value: Buffer | null = null;
    readonly Flags: DescriptorFlag[];
}

GattDescriptor.configureMembers({
    methods: {
        _ReadValue: {
            name: "ReadValue",
            inSignature: "a{sv}",
            outSignature: "ay"
        },
        _WriteValue: {
            name: "WriteValue",
            inSignature: "aya{sv}"
        }
    },
    properties: {
        UUID: {
            signature: "s",
            access: "read"
        },
        Characteristic: {
            signature: "o",
            access: "read"
        },
        Value: {
            signature: "ay",
            access: "read"
        },
        Flags: {
            signature: "as",
            access: "read"
        }
    }
})