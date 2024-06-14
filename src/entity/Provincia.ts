import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn, JoinColumn} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Comuna } from './Comuna';
import { Region } from './Region';

@ObjectType()
@Entity('provincia')
export class Provincia {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    provincia_id: number | undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    provincia_nombre: string | undefined;

    @Field(() => Int)
    @Column({ type: 'integer', name: 'region_id'})
    region_id: number | undefined;

    @Field(() => [Comuna])
    @OneToMany(() => Comuna, comuna => comuna.provincia, { eager: true })
    comunas: Comuna[] | undefined;

    @Field(() => Region)
    @ManyToOne(() => Region, region => region.provincias)
    @JoinColumn({ name: 'region_id' })
    region: Region | undefined;
}
