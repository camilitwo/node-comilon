import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { Persona } from './Persona';
import { Estado } from './Estado';
import {Transacciones} from "./Transacciones";

@Entity('tarjeta')
export class Tarjeta {
    @PrimaryGeneratedColumn()
    tar_id: number|undefined;

    @Column({ type: 'varchar' })
    tar_rut: string|undefined;

    @Column({ type: 'integer' })
    tar_pan: number|undefined;

    @ManyToOne(() => Persona, persona => persona.tarjetas)
    persona: Persona|undefined;

    @ManyToOne(() => Estado, estado => estado.tarjetas)
    tar_estado: Estado|undefined;

    @Column({ type: 'date' })
    tar_fch_registro: Date|undefined;

    @Column({ type: 'date' })
    tar_fch_cambio_estado: Date|undefined;

    @Column({ type: 'date' })
    tar_fch_vencimiento: Date|undefined;

    @OneToMany(() => Transacciones, transacciones => transacciones.tarjeta)
    transacciones: Transacciones[]|undefined;
}
