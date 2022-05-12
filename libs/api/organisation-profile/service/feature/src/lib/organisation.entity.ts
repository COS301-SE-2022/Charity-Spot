import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrganisationEntity {
    @Field({ nullable: true })
    Email: string;

    @Field({ nullable: true })
    Name: string;

    @Field({ nullable: true })
    Date: string;

    @Field({ nullable: true })
    Location: string;
}