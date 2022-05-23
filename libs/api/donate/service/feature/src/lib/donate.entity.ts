import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DonateEntity {
    @Field({ nullable: true })
    ID: string
}