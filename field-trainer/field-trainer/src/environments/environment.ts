import { FieldTrainerConfig } from "../../global-config";

export const environment = {
    production: false,
    config: new FieldTrainerConfig("127.0.0.1", "80", "5200", "6000", "5000", "6200"),
};
