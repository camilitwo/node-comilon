import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Persona} from "./Persona";
import {Tarjeta} from "./Tarjeta";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
@Entity('estado')
export class Estado {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    est_id: number | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    descripcion: string | undefined;

    @Field(() => [Persona])
    @OneToMany(() => Persona, persona => persona.personaEstado)
    personas: Persona[] | undefined;

    @Field(() => [Tarjeta])
    @OneToMany(() => Tarjeta, tarjeta => tarjeta.estado)
    tarjetas: Tarjeta[] | undefined;
}
