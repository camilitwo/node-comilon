import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Comuna } from './Comuna';
import {Persona} from "./Persona";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
@Entity('direccion')
export class Direccion {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    dir_id: number | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    dir_calle: string | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    dir_numero: string | undefined;

    @Field(() => Comuna)
    @ManyToOne(() => Comuna, comuna => comuna.direcciones)
    @JoinColumn({ name: 'comuna_id' })
    comunaDireccion: Comuna | undefined;

    @Field(() => [Persona])
    @OneToMany(() => Persona, persona => persona.direccion)
    personas: Persona[] | undefined;
}
