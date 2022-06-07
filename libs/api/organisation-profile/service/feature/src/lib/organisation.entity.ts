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

    // @Field(()=> [DonateEntity], {nullable: true})
    // Donations: DonateEntity[]
}