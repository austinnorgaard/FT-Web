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

export type ReadFlags = {
    offset?: Variant<number>;
};

export type WriteFlags = {
    offset: Variant<number>;
    type: Variant<WriteFlagType>;
    // true if prepare authorization request
    "prepare-authorize": Variant<boolean>;
};

export function shortGattUuidToLong(uuid: string): string {
    return `0000${uuid}-0000-1000-8000-00805f9b34fb`;
}
