import { FieldTrainerConfig } from "../../global-config";

export const environment = {
    production: true,
    config: {
        startConeIp: "192.168.42.1",
        frontEndPort: "80",
        smartConeApiHttpPort: "5200",
        coneApiSocketPort: "6000",
        smartConeApiSocketPort: "5000",
        coneApiHttpPort: "6200",
    } as FieldTrainerConfig,
};
