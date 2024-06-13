import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { Estado } from './Estado';
import { Direccion } from './Direccion';
import {Tarjeta} from "./Tarjeta";

@Entity('persona')
export class Persona {
    @PrimaryGeneratedColumn()
    per_id: number|undefined;

    @Column({ type: 'varchar' })
    per_rut: string|undefined;

    @Column({ type: 'varchar' })
    per_nombre: string|undefined;

    @Column({ type: 'varchar' })
    per_apellido_paterno: string|undefined;

    @Column({ type: 'varchar' })
    per_apellido_materno: string|undefined;

    @Column({ type: 'char' })
    per_sexo: string|undefined;

    @Column({ type: 'date' })
    per_fch_ingreso: Date|undefined;

    @ManyToOne(() => Estado, estado => estado.personas)
    per_estado: Estado|undefined;

    @ManyToOne(() => Direccion, direccion => direccion.personas)
    per_direccion: Direccion|undefined;

    @Column({ type: 'integer' })
    per_dato_contacto_id: number|undefined;

    @OneToMany(() => Tarjeta, tarjeta => tarjeta.persona)
    tarjetas: Tarjeta[]|undefined;
}
