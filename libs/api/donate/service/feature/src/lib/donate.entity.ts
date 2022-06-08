import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DonateEntity {

    @Field( {nullable: false})
    ItemID: string

    @Field({ nullable: false})
    ID: string

    @Field({nullable: false})
    Name: string

    @Field({nullable: false})
    Quantity: number

    @Field({nullable: false})
    Quality: string

    @Field({nullable: false})
    Category: string

    @Field({nullable: true})
    Picture: string

    @Field({nullable: false})
    Description: string


    //only for history

    @Field(()=> [DonateEntity], {nullable: true})
    Donations: DonateEntity[]
}