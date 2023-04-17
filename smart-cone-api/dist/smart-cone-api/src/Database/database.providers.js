"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
exports.FtSequelize = {
    provide: "SequelizeToken",
    useFactory: async () => {
        const sequelize = new sequelize_typescript_1.Sequelize({
            database: "field-trainer-db",
            dialect: "sqlite",
            username: "root",
            password: "",
            storage: "/var/tmp/field-trainer-db.db",
            modelPaths: [__dirname + "/Models"],
            logging: false,
            operatorsAliases: false,
        });
        await sequelize.sync();
        return sequelize;
    },
};
//# sourceMappingURL=database.providers.js.map