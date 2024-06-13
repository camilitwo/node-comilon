import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Region } from '../entity/Region';
import { AppDataSource } from '../ormconfig';

const regionRepository = AppDataSource.getRepository(Region);

@Resolver()
export class RegionResolver {
    @Query(() => [Region])
    async regions() {
        return await regionRepository.createQueryBuilder('region')
            .leftJoinAndSelect('region.provincias', 'provincia')
            .leftJoinAndSelect('provincia.comunas', 'comuna')
            .getMany();
    }

    @Query(() => Region, { nullable: true })
    async region(@Arg('id', () => Int) id: number) {
        return await regionRepository.createQueryBuilder('region')
            .leftJoinAndSelect('region.provincias', 'provincia')
            .leftJoinAndSelect('provincia.comunas', 'comuna')
            .where('region.region_id = :id', { id })
            .getOne();
    }

    @Query(() => [Region])
    async searchRegions(@Arg('nombre', () => String, { nullable: true }) nombre?: string) {

        const query = regionRepository.createQueryBuilder('region')
            .leftJoinAndSelect('region.provincias', 'provincia')
            .leftJoinAndSelect('provincia.comunas', 'comuna')

        console.log(query.getSql());

        if (nombre) {
            return await regionRepository.createQueryBuilder('region')
                .leftJoinAndSelect('region.provincias', 'provincia')
                .leftJoinAndSelect('provincia.comunas', 'comuna')
                .where('LOWER(region.region_nombre) LIKE LOWER(:nombre)', { nombre: `%${nombre}%` })
                .getMany();
        } else {
            return await regionRepository.createQueryBuilder('region')
                .leftJoinAndSelect('region.provincias', 'provincia')
                .leftJoinAndSelect('provincia.comunas', 'comuna')
                .getMany();
        }
    }
}
