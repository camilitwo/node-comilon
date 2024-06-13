import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Persona} from "./Persona";
import {Tarjeta} from "./Tarjeta";

@Entity('estado')
export class Estado {
    @PrimaryGeneratedColumn()
    est_id: number | undefined;

    @Column({ type: 'varchar' })
    descripcion: string | undefined;

    @OneToMany(() => Persona, persona => persona.per_estado)
    personas: Persona[] | undefined;

    @OneToMany(() => Tarjeta, tarjeta => tarjeta.tar_estado)
    tarjetas: Tarjeta[] | undefined;
}
