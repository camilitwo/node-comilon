import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Persona } from './Persona';
import { Estado } from './Estado';
import {Transacciones} from "./Transacciones";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
@Entity('tarjeta')
export class Tarjeta {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    tar_id: number | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    tar_rut: string | undefined;

    @Field(() => Int)
    @Column({ type: 'integer' })
    tar_pan: number | undefined;

    @Field(() => Persona, { nullable: true })
    @ManyToOne(() => Persona, persona => persona.tarjetas, { nullable: true })
    @JoinColumn({ name: 'per_id' })
    persona: Persona | undefined;

    @Field(() => Estado)
    @ManyToOne(() => Estado, estado => estado.tarjetas)
    @JoinColumn({ name: 'est_id' })
    @Column({ type: 'integer', name: 'est_id'})
    estado: Estado | undefined;

    @Field(() => Date)
    @Column({ type: 'date' })
    tar_fch_registro: Date | undefined;

    @Field(() => Date)
    @Column({ type: 'date' })
    tar_fch_cambio_estado: Date | undefined;

    @Field(() => Date)
    @Column({ type: 'date' })
    tar_fch_vencimiento: Date | undefined;

    @Field(() => [Transacciones])
    @OneToMany(() => Transacciones, transacciones => transacciones.tarjeta)
    transacciones: Transacciones[] | undefined;
}

