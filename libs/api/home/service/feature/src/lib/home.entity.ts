import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HomeEntity {
    @Field({ nullable: true })
    ID: string
}