import { FieldTrainerConfig } from "../../global-config";

export const environment = {
    production: true,
    config: new FieldTrainerConfig("192.168.42.1", "80", "5200", "6000", "5000", "6200"),
};
