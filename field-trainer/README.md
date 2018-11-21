# Overview

field-trainer is the folder where the Website's front-end code will be stored.

`field-trainer` is an Angular project which, after being built, can be served by the `serve-frontend` project, which is just a simple static HTTP server.

`field-trainer` represents the entire UI of the Field Trainer project, along with the front-end services responsibile for communicating with the backend.

# Development

To start `field-trainer` in development mode (hot reload, debug, locally hosted), do the following:

## Change the file `app.module.ts`

Find the lines like:

```
const config: SocketIoConfig = {
    url: "127.0.0.1:5000",
    options: {},
};
```

Make sure the block looks like above, instead of any different IP. This will host it locally.

## Open the file 'global-config.ts'

Make sure the bottom looks like:

```
export const FT_CONFIG: FieldTrainerConfig = new FieldTrainerConfig(
    "127.0.0.1", // IP - This is the only thing which should change on deploy! Find a way to script it...
    "80", // Port for front-end, default HTTP port so browser has no issues
    "5200", // Port for backend REST service
    "6000", // Socket port for Dumb Cone Socket (possibly unneeded? This would be backend->cone comms)
    "5000", // Real-time updates from frontend (Client) => backend (Server/host)
    "6200", // HTTP port for Backend-end to dumb cone HTTP
);
```

The important part here is the first quoted argument, which is the IP address to the smartcone. Make sure its 127.0.0.1 which is the local loopback address.

## Start the project

Run the command `ng serve --port=4200` from the `FT-WEB/field-trainer/field-trainer` folder

After its finished building, open the project in your browser at the address: 127.0.0.1:4200

You should see the Field Trainer interface.
