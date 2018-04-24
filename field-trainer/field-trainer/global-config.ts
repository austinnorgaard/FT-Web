export class FieldTrainerConfig {
    constructor(
        public startConeIp?: string,
        public frontEndPort?: string,
        public smartConeApiHttpPort?: string,
        public coneApiSocketPort?: string,
        public smartConeApiSocketPort?: string,
        public coneApiHttpPort?: string
    ) {}

    public toSmartConeHttp(route: string = "/"): string {
        return `http://${this.startConeIp}:${this.smartConeApiHttpPort}${route}`;
    }

    public getSmartConeApiSocketUrl(): string {
        console.log(`returning: http://${this.startConeIp}:${this.smartConeApiSocketPort}`);
        return `http://${this.startConeIp}:${this.smartConeApiSocketPort}`;
    }
}

export const FT_CONFIG: FieldTrainerConfig = new FieldTrainerConfig(
    "192.168.1.115",
    "4200",
    "3000",
    "3001",
    "3000",
    "3100"
);
