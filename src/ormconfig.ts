import {Region} from "./entity/region";
import {DataSource} from "typeorm";

export const AppDataSource: DataSource = new DataSource({
    type: 'postgres',
    host: 'ep-jolly-haze-a4z1k35b-pooler.us-east-1.aws.neon.tech',
    port: 5432,
    username: 'default',
    password: '8yajkRZE5dAl',
    database: 'verceldb',
    ssl: {
        rejectUnauthorized: false, // by setting to false, you allow connections to SSL sites without valid certificates
    },
    synchronize: true,
    logging: false,
    entities: [Region],
    migrations: [],
    subscribers: []
});
