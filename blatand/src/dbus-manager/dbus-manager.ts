

// Manages a collection of DBusObjects under a given Service

import { DBusObject } from "./dbus-object";

// A service is just a collection of DBus objects
export class DBusManager {
    private readonly objects: DBusObject[] = [];
}