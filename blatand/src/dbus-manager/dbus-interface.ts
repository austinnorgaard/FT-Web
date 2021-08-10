import {DBusServiceInterface } from "dbus";
import { DBusObject } from "./dbus-object";

/**
 * A DBusInterface represents a set of methods conforming to a DBus Interface
 * The methods in an implementation of an interface represent handlers
 * for the methods on the bus
 */
export class DBusInterface {
    public readonly interfacePath;
    private readonly interface: DBusServiceInterface;

    constructor(interfacePath: string, object: DBusObject) {
        this.interfacePath = interfacePath;
        this.interface = object.getServiceObject().createInterface(interfacePath);
    }

    getInterface(): DBusServiceInterface {
        return this.interface;
    }
}