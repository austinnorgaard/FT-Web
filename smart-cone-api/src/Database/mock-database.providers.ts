import { Sequelize } from "sequelize-typescript";

export const MockFtSequelize = {
    provide: "SequelizeToken",
    useFactory: async () => {
        const sequelize = new Sequelize({
            database: "field-trainer-db",
            dialect: "sqlite",
            username: "root",
            password: "",
            storage: "field-trainer-db.db",
            modelPaths: [__dirname + "/Models"],
            logging: false,
            operatorsAliases: false,
        });
        await sequelize.sync();
        return sequelize;
    },
};