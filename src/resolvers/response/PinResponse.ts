import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PinResponse {
    @Field(() => Boolean)
    locked: boolean | undefined;

    @Field(() => String)
    typeLock: string | undefined;
}
