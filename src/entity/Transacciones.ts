import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tarjeta } from './Tarjeta';

@Entity('transacciones')
export class Transacciones {
    @PrimaryGeneratedColumn()
    trans_id: number|undefined;

    @Column({ type: 'integer' })
    tar_pan: number|undefined;

    @Column({ type: 'integer' })
    monto: number|undefined;

    @Column({ type: 'date' })
    fch_movimiento: Date|undefined;

    @ManyToOne(() => Tarjeta, tarjeta => tarjeta.transacciones)
    tarjeta: Tarjeta|undefined;


}
