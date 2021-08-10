# Overview

## Intro

`Blatand` is a Bluetooth LE peripheral library for `nodejs` running on Linux platforms with `Bluez 5.x+` (TODO: Clarify minimum version)

`Blatand` is intended as a complete solution for developing a generic Bluetooth LE peripheral. Plans are to include some basic `GATT` services which are common, such as the Battery Service. Beyond that, developers are intended to use this library to create their own set of `GATT` Services, Characteristics and Descriptors.

This library will also contain necessary machinery to implement various Bluetooth actions like the Bluetooth agent (defining the rules for how/when a pairing request is accepted).

## GATT Profiles

A GATT "profile" is a collection of GATT services, which are a collection of GATT characteristics, which are a collection of optional GATT characteristic descriptors. A service exposes a high-level API for consumers (often called BLE Central devices, like your phone). Services do this by managing a collection of Characteristics which contain a set of _optional_ descriptors.

Services represent some high level abstract concept, for instance the Battery Service says, "You can query battery levels". The Battery Service then has a battery level characteristic which provides the Read/Write API to actually read that query level. A descriptor for this characteristic could then provide additional info like the units of the measurement.

More high level info can be found here: https://learn.adafruit.com/introduction-to-bluetooth-low-energy/gatt

# Misc

## Build dependencies

```
npm install -g node-gyp
apt-get install libdbus-1-dev libglib2.0-dev
```

## Blatand?

Supposedly Bluetooth was named after "Harald "Blatand" Gormsson" and the name sounds weird & fun to say.
