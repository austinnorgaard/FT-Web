/// DBus Proxy object over a Bluetooth adapter, which lets us handle things like
/// connectability, pairing, discoverability, etc

import * as dbus from "dbus-next";

let {
    Variant
} = dbus;

export class BluetoothAdapter {
    private bluez: dbus.ProxyObject;
    private initialized: boolean = false;

    constructor(private readonly bus: dbus.MessageBus) {
    }

    assert_init() {
        if (!this.initialized) {
            throw new Error("Adapter not initialized yet. Call and await Initialize before continuing");
        }
    }

    // Unfortunately no async constructors, so we need someone to call this otherwise we have
    // a race on the completion of `getProxyObject`
    async Initialize() {
        this.bluez = await this.bus.getProxyObject("org.bluez", "/org/bluez");
        this.initialized = true;
    }

    async GetAdapterProperty(key: String) {
        this.assert_init();
        let hci0 = await this.bus.getProxyObject("org.bluez", "/org/bluez/hci0");

        let adapter = hci0.getInterface("org.freedesktop.DBus.Properties");
        let variant = await adapter.Get('org.bluez.Adapter1', key);

        return variant.value;
    }

    async SetAdapterProperty(key: String, value: any, dbusType: string) {
        this.assert_init();
        let hci0 = await this.bus.getProxyObject("org.bluez", "/org/bluez/hci0");

        let adapter = hci0.getInterface("org.freedesktop.DBus.Properties");
        await adapter.Set("org.bluez.Adapter1", key, new Variant(dbusType, value));
    }

    async Name(): Promise<String> {
        return this.GetAdapterProperty('Name');
    }

    async Class(): Promise<number> {
        return this.GetAdapterProperty('Class');
    }

    async Address(): Promise<String> {
        return this.GetAdapterProperty('Address');
    }

    async Powered(): Promise<Boolean> {
        return this.GetAdapterProperty('Powered');
    }

    async Pairable(): Promise<Boolean> {
        return this.GetAdapterProperty("Pairable");
    }

    async Discovering(): Promise<Boolean> {
        return this.GetAdapterProperty("Discovering");
    }

    async Discoverable(): Promise<Boolean> {
        return this.GetAdapterProperty("Discoverable");
    }

    async SetDiscoverable(discoverable: boolean): Promise<void> {
        await this.SetAdapterProperty("Discoverable", discoverable, 'b');
    }

    async SetPairable(pairable: boolean): Promise<void> {
        await this.SetAdapterProperty("Pairable", pairable, 'b');
    }

    async SetPowered(powered: boolean): Promise<void> {
        await this.SetAdapterProperty("Powered", powered, 'b');
    }
}