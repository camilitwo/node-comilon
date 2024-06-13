import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Provincia } from './Provincia';
import {type} from "node:os";

@ObjectType()
@Entity('region')
export class Region {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  region_id: number | undefined;

  @Field(() => String)
  @Column({ type: 'varchar', name: 'region_nombre'})
  region_nombre: string | undefined;

  @Field(() => String)
  @Column({ type: 'varchar' , name: 'region_ordinal'})
  region_ordinal: string | undefined;

  @Field(() => [Provincia])
  @OneToMany(() => Provincia, provincia => provincia.region, { eager: true })
  provincias: Provincia[] | undefined;
}
