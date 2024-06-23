import { Resolver, Query, Arg, Int } from 'type-graphql';
import { AppDataSource } from '../ormconfig';
import { Tarjeta } from '../entity/Tarjeta';
import {Estado} from "../entity/Estado";

const cardRepository = AppDataSource.getRepository(Tarjeta);
const estadoRepository = AppDataSource.getRepository(Estado);

@Resolver()
export class CardResolver {
    @Query(() => [Tarjeta], { nullable: true })
    async cards() {
        const query = this.queryCards().orderBy('card.tar_fch_registro', 'DESC');;
        return await query.getMany();
    }

    @Query(() => Tarjeta, { nullable: true })
    async card(@Arg('pan', () => Int) pan: number) {
        const query = this.queryCards()
            .where('card.tar_pan = :pan', {pan})
            .orderBy('card.tar_fch_registro', 'DESC');

        console.log(query.getSql());

        const result = await query.getOne();


        return result;
    }

    @Query(() => [Tarjeta])
    async searchCards(@Arg('rut', () => String, { nullable: true }) rut?: string) {
        const query = this.queryCards();
        if (rut) {
            query.where('LOWER(persona.per_rut) LIKE LOWER(:rut)', { rut: `%${rut}%` })
                .orderBy('card.tar_fch_registro', 'DESC')
                .addOrderBy('card.estado', 'ASC');
        }

        return await query.getMany();
    }

    @Query(() => Tarjeta, { nullable: true })
    async updateCardStatus(
        @Arg('cardNumber', () => Number) cardNumber: number,
        @Arg('statusId', () => Int) statusId: number
    ): Promise<Tarjeta | undefined> {
        const cardRepo = cardRepository;
        const statusRepo = estadoRepository;
        const cardToUpdate = await cardRepo.findOne({ where: { tar_pan: cardNumber } });

        if (!cardToUpdate) {
            throw new Error(`Card with number ${cardNumber} not found.`);
        }

        const newStatus = await statusRepo.findOne({where: {est_id: statusId}});
        if(!newStatus) {
            throw new Error(`Status with id ${statusId} not found.`);
        }

        cardToUpdate.estado = newStatus;
        cardToUpdate.tar_fch_cambio_estado = new Date();
        return await cardRepo.save(cardToUpdate);
    }

    private queryCards() {
        const query = cardRepository.createQueryBuilder('card')
            .leftJoinAndSelect('card.persona', 'persona')
            .leftJoinAndSelect('card.estado', 'estado')
            .leftJoinAndSelect('persona.direccion', 'direccion')
            .leftJoinAndSelect('persona.personaEstado', 'personaEstado')
            .leftJoinAndSelect('direccion.comunaDireccion', 'comunaDireccion')
            .leftJoinAndSelect('comunaDireccion.provincia', 'provincia')
            .leftJoinAndSelect('provincia.region', 'region')
            .leftJoinAndSelect('card.transacciones', 'transacciones')
        console.log(query.getSql());
        return query;
    }
}
