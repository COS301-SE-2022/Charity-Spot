import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HomeEntity {
    @Field({ nullable: true })
    ID: string

    @Field({ nullable: true })
    Name: string

    @Field({ nullable: true})
    Address: string

    @Field({ nullable: true})
    ItemName: string

    @Field({ nullable: true})
    OrgID: string

    @Field({ nullable: true})
    Type: string

    @Field({ nullable: true})
    Location: string

    @Field({ nullable: true})
    Province: string

    @Field({ nullable: true})
    City: string

}