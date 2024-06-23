import {Field, GraphQLISODateTime, Int, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity('pin_estado_log')
export class PinEstadoLog {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number|undefined;

    @Field(() => String)
    @Column({ type: 'varchar' })
    beneficiario_id: string|undefined;

    @Field(() => Int)
    @Column({ type: 'int' })
    intento: number|undefined;

    @Field(() => Int)
    @Column({ type: 'int' })
    bloque: number|undefined;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @Column({ type: 'date', name: 'fcha_expiracion', nullable: true})
    fcha_expiracion: Date|undefined;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @Column({ type: 'date', name: 'ultimo_intento', nullable: true})
    ultimo_intento: Date|undefined;

    @Field(() => Int)
    @Column({ type: 'int' })
    pin_rules_id: number|undefined;

}
