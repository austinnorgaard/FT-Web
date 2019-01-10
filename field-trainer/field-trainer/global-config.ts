/*  Trying to keep things easier to reason about. Using the following convention (subject to change)
/   All ports are 4 digits, XXXX
/   Front End - Starts with 4
/   Back End - Starts with 5
/   Cones - Starts with 6
/   HTTP ports for NON rendering are: x200 (OK?)
/   HTTP ports for rendering are 80 or 8080 (so it plays nicely with browsers)
/   Socket API ports are x000
/
/   FRONT END -
        HTTP FrontEnd (this is what users are going to connect to): 80 (or 8080), to auto resolve in browsers
        Socket (This is for real-time updates from backend -> frontend): 4000

    BACK END (Smart Cone API) -
        HTTP EndPoint (Front end makes request when querying data or changing backend state): 5200
        Socket (This is for real-time updates from cones -> backend): 5000

    CONES ("Dumb" cones) -
        HTTP EndPoint (Allows backend to query status, possibly do things): 6200
        (Socket should not be needed, but if it was, it'd be on 6000)

    IP ADDRESS FOR FRONTEND/BACKEND --
        Need a way to set this (probably from env var, or passed in via script?)
        For now, just set it here before starting.
*/

export class FieldTrainerConfig {
    constructor(
        public startConeIp?: string,
        public frontEndPort?: string,
        public smartConeApiHttpPort?: string,
        public coneApiSocketPort?: string,
        public smartConeApiSocketPort?: string,
        public coneApiHttpPort?: string,
    ) {}

    public toSmartConeHttp(route: string = "/"): string {
        return `http://${this.startConeIp}:${this.smartConeApiHttpPort}${route}`;
    }

    public getSmartConeApiSocketUrl(): string {
        return `http://${this.startConeIp}:${this.smartConeApiSocketPort}`;
    }

    public getConeApiSocketUrl(): string {
        return `http://${this.startConeIp}:${this.coneApiSocketPort}`;
    }
}
