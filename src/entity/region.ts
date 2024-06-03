import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Provincia } from './provincia';

@Entity('region')
export class Region {
  @PrimaryGeneratedColumn()
  region_id: number | undefined;

  @Column({ type: 'varchar' })
  region_nombre: string;

  @Column({ type: 'varchar' })
  region_ordinal: string;



  constructor() {
    this.region_nombre = '';
    this.region_ordinal = '';
  }
}
