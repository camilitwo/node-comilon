import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Tarjeta } from './Tarjeta';
import {Field, Int, ObjectType} from "type-graphql";
import {GraphQLDate} from "../scalars/GraphQLScalarType";
import {Transacciones} from "./Transacciones";

@ObjectType()
@Entity('tipo_movimiento')
export class TipoMovimiento {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    mov_id: number|undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    mov_descripcion: string|undefined;

    @Field(() => [Transacciones], { nullable: true })
    @OneToMany(() => Transacciones, transacciones => transacciones.movimiento, { nullable: true })
    transacciones: Transacciones[] | undefined;
}
