import { Field, ID, ObjectType } from '@nestjs/graphql';
import { catagory, quality } from '@prisma/client';

@ObjectType()
export class DonateEntity {
    @Field({ nullable: false})
    ID: string

    @Field({nullable: false})
    Name: string

    @Field({nullable: false})
    Quantity: number

    @Field({nullable: false})
    Quality: quality

    @Field({nullable: false})
    Category: catagory

    @Field({nullable: true})
    Picture: string

    @Field({nullable: false})
    Description: string


    //only for histoy

    @Field(()=> [DonateEntity], {nullable: true})
    Donations: DonateEntity[]
}