import { DonateEntity } from '@charity-spot/api/donate/service/feature';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrganisationEntity {
    @Field({ nullable: false })
    Email: string;

    @Field({ nullable: true })
    Name: string;

    @Field({ nullable: true })
    Date: string;

    @Field({ nullable: true })
    Location: string;

    @Field({ nullable: true })
    Picture: string;

    @Field({ nullable: true })
    Internal: string;

    @Field({ nullable: true })
    AvgRating: number;

    @Field({ nullable: true })
    Description: string;

}