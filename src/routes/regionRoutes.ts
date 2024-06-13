import { Router } from 'express';
import { AppDataSource } from '../ormconfig';
import { Region } from '../entity/Region';
import { Raw } from 'typeorm';

const regionRouter = Router();
const regionRepository = AppDataSource.getRepository(Region);

regionRouter.get('/create-region', async (req, res) => {
    const region = new Region();
    region.region_nombre = "North America";
    region.region_ordinal = "1";

    await regionRepository.save(region);
    res.send(`Region created: ${JSON.stringify(region)}`);
});

regionRouter.get('/regions', async (req, res) => {
    const regions = await regionRepository.find();
    res.json(regions);
});

regionRouter.get('/regions/search/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    const regions = await regionRepository.find({
        where: {
            region_nombre: Raw(columnAlias => `UPPER(${columnAlias}) LIKE UPPER('%${nombre}%')`)
        }
    });
    res.json(regions);
});

export default regionRouter;
