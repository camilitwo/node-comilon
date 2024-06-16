import { Resolver, Query, Arg, Int } from 'type-graphql';
import { AppDataSource } from '../ormconfig';
import { Tarjeta } from '../entity/Tarjeta';

const cardRepository = AppDataSource.getRepository(Tarjeta);

@Resolver()
export class CardResolver {
    @Query(() => [Tarjeta], { nullable: true })
    async cards() {
        const query = cardRepository.createQueryBuilder('card')
            .leftJoinAndSelect('card.persona', 'persona')
            .leftJoinAndSelect('card.transacciones', 'transacciones')
            .leftJoinAndSelect('card.estado', 'estado')
            .leftJoinAndSelect('persona.direccion', 'direccion')
            .leftJoinAndSelect('persona.personaEstado', 'personaEstado')
            .leftJoinAndSelect('direccion.comunaDireccion', 'comunaDireccion')
            .leftJoinAndSelect('comunaDireccion.provincia', 'provincia')
            .leftJoinAndSelect('provincia.region', 'region');

        console.log(query.getSql());

        return await cardRepository.createQueryBuilder('card')
            .leftJoinAndSelect('card.persona', 'persona')
            .leftJoinAndSelect('card.transacciones', 'transacciones')
            .leftJoinAndSelect('card.estado', 'estado')
            .leftJoinAndSelect('persona.direccion', 'direccion')
            .leftJoinAndSelect('persona.personaEstado', 'personaEstado')
            .leftJoinAndSelect('direccion.comunaDireccion', 'comunaDireccion')
            .leftJoinAndSelect('comunaDireccion.provincia', 'provincia')
            .leftJoinAndSelect('provincia.region', 'region')
            .getMany();
    }

    @Query(() => Tarjeta, { nullable: true })
    async card(@Arg('id', () => Int) id: number) {
        return await cardRepository.createQueryBuilder('card')
            .leftJoinAndSelect('card.persona', 'persona')
            .leftJoinAndSelect('card.transacciones', 'transacciones')
            .leftJoinAndSelect('card.estado', 'estado')
            .where('card.tar_id = :id', { id })
            .getOne();
    }

    @Query(() => [Tarjeta])
    async searchCards(@Arg('nombre', () => String, { nullable: true }) nombre?: string) {
        const query = cardRepository.createQueryBuilder('card')
            .leftJoinAndSelect('card.persona', 'persona')
            .leftJoinAndSelect('card.estado', 'estado');

        if (nombre) {
            query.where('LOWER(persona.per_nombre) LIKE LOWER(:nombre)', { nombre: `%${nombre}%` });
        }

        return await query.getMany();
    }
}
