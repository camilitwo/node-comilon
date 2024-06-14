import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Tarjeta } from './Tarjeta';
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
@Entity('transacciones')
export class Transacciones {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    trans_id: number|undefined;

    @Field(() => Int)
    @Column({ type: 'integer' })
    tar_pan: number|undefined;

    @Field(() => Int)
    @Column({ type: 'integer' })
    monto: number|undefined;

    @Field(() => Date)
    @Column({ type: 'date' })
    fch_movimiento: Date|undefined;

    @Field(() => Tarjeta)
    @ManyToOne(() => Tarjeta, tarjeta => tarjeta.transacciones)
    @JoinColumn({ name: 'tar_id' })
    tarjeta: Tarjeta|undefined;


}
