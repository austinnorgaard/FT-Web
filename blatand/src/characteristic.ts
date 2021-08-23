import * as dbus from "dbus-next";
import { GattDescriptor } from "./descriptor";
import {
    CharacteristicFlag,
    DBusReadFlags,
    DBusWriteFlags,
    DescriptorFlag,
    ReadFlags,
    shortGattUuidToLong,
    ToReadFlags,
    ToWriteFlags,
    WriteFlags,
} from "./shared";

let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;

export abstract class GattCharacteristic extends Interface {
    constructor(uuid: string, service: string, flags: CharacteristicFlag[], private readonly descriptors: GattDescriptor[]) {
        super("org.bluez.GattCharacteristic1");
        this.UUID = shortGattUuidToLong(uuid);
        this.Service = service;
        this.Flags = flags;
        this.Characteristic = `${this.Service}/${uuid}`;
    }

    abstract ReadValue(flags: ReadFlags): Promise<Buffer>;
    async _ReadValue(flags: DBusReadFlags): Promise<Buffer> {
        return this.ReadValue(ToReadFlags(flags));
    }

    abstract WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void>;
    async _WriteValue(bytes: Buffer, flags: DBusWriteFlags): Promise<void> {
        return this.WriteValue(bytes, ToWriteFlags(flags));
    }

    abstract StartNotify(): void;
    _StartNotify(): void {
        this.StartNotify();
    }

    abstract StopNotify(): void;
    _StopNotify(): void {
        this.StopNotify();
    }

    Register(bus: dbus.MessageBus) {
        bus.export(this.Characteristic, this);
    }

    GetDescriptors(): GattDescriptor[] {
        return this.descriptors;
    }

    ToDBusObject(): any {
        return {
            "org.bluez.GattCharacteristic1": {
                UUID: new dbus.Variant("s", this.UUID),
                Service: new dbus.Variant("o", this.Service),
                Flags: new dbus.Variant("as", this.Flags),
            },
        };
    }

    GetObjectPath(): string {
        return this.Characteristic;
    }

    readonly UUID: string;
    // object path to parent Service
    readonly Service: string;
    readonly Flags: CharacteristicFlag[];

    private Characteristic: string;
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
