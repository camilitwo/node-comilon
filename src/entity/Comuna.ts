import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn, JoinColumn} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Provincia } from './Provincia';
import { Direccion } from './Direccion';
import {Col} from "sequelize/types/utils";

@ObjectType()
@Entity('comuna')
export class Comuna {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    comuna_id: number | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    comuna_nombre: string | undefined;

    @Field(() => Int)
    @Column({ type: 'integer', name: 'provincia_id'})
    provincia_id: number | undefined;

    @Field(() => Provincia)
    @ManyToOne(() => Provincia, provincia => provincia.comunas)
    @JoinColumn({ name: 'provincia_id' })
    provincia: Provincia | undefined;
}
