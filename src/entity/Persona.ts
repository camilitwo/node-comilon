import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Estado } from './Estado';
import { Direccion } from './Direccion';
import {Tarjeta} from "./Tarjeta";
import {Field, Int, ObjectType} from "type-graphql";
import {CHAR} from "sequelize";

@ObjectType()
@Entity('persona')
export class Persona {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    per_id: number | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    per_rut: string | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    per_nombre: string | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    per_apellido_paterno: string | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    per_apellido_materno: string | undefined;

    @Field(() => String)
    @Column({ type: 'char' })
    per_sexo: string | undefined;

    @Field(() => Date)
    @Column({ type: 'date' })
    per_fch_ingreso: Date | undefined;

    @Field(() => Estado)
    @ManyToOne(() => Estado, estado => estado.personas)
    @JoinColumn({ name: 'est_id' })
    personaEstado: Estado | undefined;

    @Field(() => Direccion)
    @ManyToOne(() => Direccion, direccion => direccion.personas)
    @JoinColumn({ name: 'dir_id' })
    direccion: Direccion | undefined;

    @Field(() => Int)
    @Column({ type: 'integer' })
    per_dato_contacto_id: number | undefined;

    @Field(() => [Tarjeta])
    @OneToMany(() => Tarjeta, tarjeta => tarjeta.persona)
    tarjetas: Tarjeta[] | undefined;
}
