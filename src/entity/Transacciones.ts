import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Tarjeta } from './Tarjeta';
import {Field, Int, ObjectType} from "type-graphql";
import {GraphQLDate} from "../scalars/GraphQLScalarType";
import {TipoMovimiento} from "./TipoMovimiento";

@ObjectType()
@Entity('transacciones')
export class Transacciones {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    trans_id: number|undefined;

    @Field(() => Number)
    @Column({ type: 'numeric' })
    tar_pan: number|undefined;

    @Field(() => Int)
    @Column({ type: 'int' })
    tar_id: number|undefined;

    @Field(() => Int)
    @Column({ type: 'integer' })
    monto: number|undefined;

    @Field(() => GraphQLDate)
    @Column({ type: 'date' })
    fch_movimiento: Date|undefined;

    @Field(() => Tarjeta, { nullable: true })
    @ManyToOne(() => Tarjeta, tarjeta => tarjeta.transacciones, { nullable: true })
    @JoinColumn({ name: 'tar_id' })
    tarjeta: Tarjeta | undefined;

    @Field(() => TipoMovimiento, { nullable: true })
    @ManyToOne(() => TipoMovimiento, tipoMovimiento => tipoMovimiento.transacciones, { nullable: true })
    @JoinColumn({ name: 'mov_id' })
    movimiento: TipoMovimiento | undefined;


}
