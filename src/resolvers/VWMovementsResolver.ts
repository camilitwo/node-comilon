import {Arg, Int, Query, Resolver} from 'type-graphql';
import {AppDataSource} from '../ormconfig';
import {VwMovimientos} from '../entity/VwMovimientos';

const vwMovimientosRepository = AppDataSource.getRepository(VwMovimientos);

@Resolver()
    export class VWMovementsResolver {
        @Query(() => [VwMovimientos], { nullable: true })
        async movements() {
            const query = this.queryMovements().orderBy('vw_movimientos.fecha_movimiento', 'DESC');
            return await query.getMany();
        }

        @Query(() => VwMovimientos, { nullable: true })
        async movement(@Arg('numero_transaccion', () => Int) numero_transaccion: number) {
            const query = this.queryMovements()
                .where('vw_movimientos.numero_transaccion = :numero_transaccion', {numero_transaccion})
                .orderBy('vw_movimientos.fecha_movimiento', 'DESC');

            console.log(query.getSql());

            return await query.getOne();
        }

        @Query(() => [VwMovimientos], { nullable: true })
        async searchMovements(@Arg('rut', () => String, { nullable: true }) rut?: string) {
            const query = this.queryMovements();
            if (rut) {
                query.where('LOWER(vw_movimientos.rut_tarjeta_beneficiario) LIKE LOWER(:rut_tarjeta_beneficiario)', { rut_tarjeta_beneficiario: `%${rut}%` })
                    .orderBy('vw_movimientos.fecha_movimiento', 'DESC')
                    .addOrderBy('vw_movimientos.numero_transaccion', 'DESC');
            }

            return await query.getMany();
        }

        private queryMovements() {
            return vwMovimientosRepository.createQueryBuilder('vw_movimientos');
        }

}
