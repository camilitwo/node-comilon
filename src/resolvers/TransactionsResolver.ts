import {Arg, Int, Query, Resolver} from 'type-graphql';
import {AppDataSource} from '../ormconfig';
import {Transacciones} from "../entity/Transacciones";
import {Tarjeta} from "../entity/Tarjeta";

const movementsRepository = AppDataSource.getRepository(Transacciones);
const cardRepository = AppDataSource.getRepository(Tarjeta);

@Resolver()
export class TransactionsResolver {
    @Query(() => [Transacciones], { nullable: true })
    async transactions() {
        const query = this.queryTransactions();
        return await query.getMany();
    }

    @Query(() => Transacciones, { nullable: true })
    async transaction(@Arg('id', () => Int) id: number) {
        return await this.queryTransactions()
            .where('transacciones.id = :id', { id })
            .getOne();
    }

    //insert una nueva transaccion
    @Query(() => Transacciones, { nullable: true })
    async insertTransaction(
        @Arg('cardNumber', () => Number) tarjeta: number,
        @Arg('amount', () => Int) monto: number
    ): Promise<Transacciones | undefined> {
        const transactionRepo = movementsRepository;
        const newTransaction = new Transacciones();

        const card = await cardRepository.findOne({ where: { tar_pan: tarjeta } });
        if(!card) {
            throw new Error(`card pan id ${card} not found.`);
        }
        newTransaction.tar_pan = tarjeta;
        newTransaction.monto = monto;
        newTransaction.tar_id = card.tar_id;
        newTransaction.fch_movimiento = new Date();
        return await transactionRepo.save(newTransaction);
    }


    private queryTransactions() {
        const query = movementsRepository.createQueryBuilder('transacciones')
            .leftJoinAndSelect('transacciones.tarjeta', 'tarjeta')
            .leftJoinAndSelect('transacciones.estado', 'estado')
            .leftJoinAndSelect('tarjeta.persona', 'persona')
            .leftJoinAndSelect('persona.direccion', 'direccion')
            .leftJoinAndSelect('persona.personaEstado', 'personaEstado')
            .leftJoinAndSelect('tarjeta.estado', 'tarjetaEstado');
        console.log(query.getQuery());
        return query;
    }

}
