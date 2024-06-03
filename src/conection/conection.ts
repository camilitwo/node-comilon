import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { region } from '../entity/region'
import { AppDataSource } from '../ormconfig'

createConnection().then(async connection => {
    console.log('Conectado a la base de datos');
    const regionRepository = AppDataSource.getRepository(region);
    const regiones = await regionRepository.find();
    console.log(regiones);
}).catch(error => console.log(error));