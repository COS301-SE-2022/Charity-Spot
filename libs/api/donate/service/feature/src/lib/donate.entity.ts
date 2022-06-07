import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DonateEntity {
    @Field({ nullable: false})
    ID: string

    @Field({nullable: false})
    Name: string

    @Field({nullable: true})
    Picture: string

    @Field({nullable: false})
    Description: string
}

@ObjectType()
export class donationHistory {
    @Field(()=> [DonateEntity], {nullable: true})
    Donations: DonateEntity[]
}