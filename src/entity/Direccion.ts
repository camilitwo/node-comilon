import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
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

    @Field(() => Int)
    @Column({ type: 'integer' })
    dir_comuna_id: number | undefined;

    //@Field(() => [Persona])
    @OneToMany(() => Persona, persona => persona.per_direccion)
    personas: Persona[] | undefined;
}
