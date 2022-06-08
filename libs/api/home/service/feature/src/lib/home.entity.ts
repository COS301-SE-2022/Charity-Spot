import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HomeEntity {
    @Field({ nullable: true })
    ID: string

    @Field({ nullable: true })
    Name: string

    @Field({ nullable: true})
    Address: string
}