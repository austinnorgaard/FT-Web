import { Variant } from "dbus-next";

export type DescriptorFlag =
    | "read"
    | "write"
    | "encrypt-read"
    | "encrypt-write"
    | "encrypt-authenticated-read"
    | "encrypt-authenticated-write"
    | "authorize";
export type CharacteristicFlag =
    | "broadcast"
    | "read"
    | "write-without-response"
    | "write"
    | "notify"
    | "indicate"
    | "authenticated-signed-writes"
    | "extended-properties"
    | "reliable-write"
    | "writable-auxiliaries"
    | "encrypt-read"
    | "encrypt-write"
    | "encrypt-authenticated-read"
    | "encrypt-authenticated-write"
    | "authorize";

export type WriteFlagType =
    | "command" // Write without response
    | "request" // Write with response
    | "reliable"; // Reliable Write (TODO: What is this?)

// What else?
export type LinkType = "BR/EDR";

export type DBusReadFlags = {
    offset?: Variant<number>;
    device?: Variant<string>;
    mtu?: Variant<number>;
};

export type DBusWriteFlags = {
    offset?: Variant<number>;
    type?: Variant<WriteFlagType>;
    // true if prepare authorization request
    "prepare-authorize": Variant<boolean>;
    mtu?: Variant<number>;
    device?: Variant<string>;
    link?: Variant<LinkType>;
};

export type ReadFlags = {
    offset?: number;
    mtu?: number;
    // an object path, but we could parse out to an actual device instance
    device?: string;
};

export type WriteFlags = {
    offset?: number;
    type?: WriteFlagType;
    mtu?: number;
    device?: string;
    link?: LinkType;
    prepare_authorize?: boolean;
};

export function ToReadFlags(flags: DBusReadFlags): ReadFlags {
    return {
        offset: flags.offset?.value,
        device: flags.device?.value,
        mtu: flags.mtu?.value,
    };
}

export function ToWriteFlags(flags: DBusWriteFlags): WriteFlags {
    return {
        offset: flags.offset?.value,
        device: flags.device?.value,
        mtu: flags.mtu?.value,
        type: flags.type?.value,
        link: flags.link?.value,
        prepare_authorize: flags["prepare-authorize"]?.value,
    };
}

export function shortGattUuidToLong(uuid: string): string {
    return `0000${uuid}-0000-1000-8000-00805f9b34fb`;
}
