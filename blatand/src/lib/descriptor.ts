import * as dbus from "dbus-next";
import { DBusReadFlags, DBusWriteFlags, DescriptorFlag, ReadFlags, shortGattUuidToLong, ToReadFlags, ToWriteFlags, WriteFlags } from "./shared";

let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;

export abstract class GattDescriptor extends Interface {
    constructor(uuid: string, characteristic: string, flags: DescriptorFlag[]) {
        super("org.bluez.GattDescriptor1");
        this.UUID = shortGattUuidToLong(uuid);
        this.Characteristic = characteristic;
        this.Flags = flags;
        this.Descriptor = `${this.Characteristic}/${uuid}`;
    }

    abstract ReadValue(flags: ReadFlags): Promise<Buffer>;

    async _ReadValue(flags: DBusReadFlags): Promise<Buffer> {
        return this.ReadValue(ToReadFlags(flags));
    }

    abstract WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void>;

    async _WriteValue(bytes: Buffer, flags: DBusWriteFlags): Promise<void> {
        return this.WriteValue(bytes, ToWriteFlags(flags));
    }

    Register(bus: dbus.MessageBus) {
        bus.export(this.Descriptor, this);
    }

    ToDBusObject(): any {
        return {
            "org.bluez.GattDescriptor1": {
                UUID: new dbus.Variant("s", this.UUID),
                Characteristic: new dbus.Variant("o", this.Characteristic),
                Flags: new dbus.Variant("as", this.Flags),
            },
        };
    }

    GetObjectPath(): string {
        return this.Descriptor;
    }

    readonly UUID: string;
    readonly Characteristic: string;
    // optional - cached value, is equal to the last value returned from ReadValue
    Value: Buffer | null = null;
    readonly Flags: DescriptorFlag[];

    private Descriptor: string; // our object path
}

GattDescriptor.configureMembers({
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
    },
    properties: {
        UUID: {
            signature: "s",
            access: "read",
        },
        Characteristic: {
            signature: "o",
            access: "read",
        },
        Value: {
            signature: "ay",
            access: "read",
        },
        Flags: {
            signature: "as",
            access: "read",
        },
    },
});
