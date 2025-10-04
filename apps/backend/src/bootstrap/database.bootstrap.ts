import { DataSource } from "typeorm";

export class DatabaseBootstrap {
    static dataSource: DataSource;
    
    async intialize() {
        const dataSource = new DataSource({
            type: "mysql",
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "3306", 10),
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "test",
            synchronize: true,
            logging: false,
            entities: [__dirname + "/../modules/**/*.entity{.ts,.js}"],
        });

        DatabaseBootstrap.dataSource = dataSource;

        return await dataSource.initialize();
    }
}