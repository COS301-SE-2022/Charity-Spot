import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrganisationEntity {
    @Field({ nullable: true })
    ID: string
}