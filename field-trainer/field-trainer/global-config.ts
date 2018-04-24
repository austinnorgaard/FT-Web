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
        return `http://${this.startConeIp}:${this.smartConeApiSocketPort}`;
    }
}

export const FT_CONFIG: FieldTrainerConfig = new FieldTrainerConfig({
    startConeIp: "192.168.1.115",
    frontEndPort: "4200",
    smartConeApiHttpPort: "3000",
    coneApiSocketPort: "3001",
    smartConeApiSocketPort: "3000",
    coneApiHttpPort: "3100"
} as any); // As 'any' so we can get named params to make this easier to change in future
