import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Region } from './region';

@Entity('provincia')
export class Provincia {
    @PrimaryGeneratedColumn()
    provincia_id: number | undefined;

    //... other columns


}
