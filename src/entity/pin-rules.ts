import {Field, Int, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity('pin_rules')
export class PinRules {

    @Field(() => Int, { nullable: true })
    @PrimaryGeneratedColumn()
    id: number|undefined;

    @Field(() => Int, { nullable: true })
    @Column({ type: 'int' })
    tiempo_penalizado: number|undefined;

    @Field(() => Int, { nullable: true })
    @Column({ type: 'int' })
    orden: number|undefined;

    @Field(() => String , { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    estado: string|undefined;

    @Field(() => Int, { nullable: true })
    @Column({ type: 'int' })
    rango_intento: number|undefined;

    @Field(() => Int, { nullable: true })
    @Column({ type: 'int' })
    expiracion_bloque:number|undefined;
}
