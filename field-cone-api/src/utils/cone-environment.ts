export const coneEnvironment = {
    production: true,
    config: {
        coneId: 1,
        FieldConeSocketURL: "http://localhost",
    },

    updateID(newId: number): void {
        coneEnvironment.config.coneId = newId;
    }
};
