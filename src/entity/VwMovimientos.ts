import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";
import {GraphQLDate} from "../scalars/GraphQLScalarType";

@ObjectType()
@Entity('vw_movimientos', { synchronize: false })
export class VwMovimientos {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    numero_transaccion: number|undefined;

    @Field(() => Int)
    @Column({ type: 'integer' })
    monto: number|undefined;

    @Field(() => GraphQLDate)
    @Column({ type: 'date' })
    fecha_movimiento: Date|undefined;

    @Field(() => Number)
    @Column({ type: 'numeric' })
    numero_tarjeta: number|undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    rut_tarjeta_beneficiario: string|undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    detalle_movimiento: string|undefined;

    @Field(() => Int)
    @Column({ type: 'numeric' })
    tipo_movimiento: number|undefined;



}
