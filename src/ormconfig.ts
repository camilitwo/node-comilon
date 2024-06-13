import {Region} from "./entity/Region";
import {DataSource} from "typeorm";
import {Comuna} from "./entity/Comuna";
import {Provincia} from "./entity/Provincia";

export const AppDataSource: DataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_URL,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: false, // by setting to false, you allow connections to SSL sites without valid certificates
    },
    synchronize: true,
    logging: false,
    entities: [Region, Comuna, Provincia],
    migrations: [],
    subscribers: []
});
