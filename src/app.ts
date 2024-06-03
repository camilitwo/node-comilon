import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './ormconfig';
import { Region } from './entity/region';
import { Like, Raw } from 'typeorm';
import {where} from "sequelize";

const app = express();
const port = 3000;

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");

        const regionRepository = AppDataSource.getRepository(Region);

        app.get('/create-region', async (req, res) => {
            const region = new Region();
            region.region_nombre = "North America";
            region.region_ordinal = "1";

            await regionRepository.save(region);
            res.send(`Region created: ${JSON.stringify(region)}`);
        });

        app.get('/regions', async (req, res) => {
            const regions = await regionRepository.findBy({region_id: 1});
            res.json(regions);
        });

        app.get('/regions/search/:nombre', async (req, res) => {
            const nombre = req.params.nombre;
            const regions = await regionRepository.find({
                where: {
                    region_nombre: Raw(columnAlias => `UPPER(${columnAlias}) LIKE UPPER('%${nombre}%')`)
                }
            })
            res.json(regions);
        });


        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });

    })
    .catch((error) => console.log("Error during Data Source initialization:", error));
