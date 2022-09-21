import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class itemRequestEntity {

    @Field({ nullable: true })
    ID: string

    @Field({ nullable: true })
    Probability: string

    @Field({nullable : true})
    OrgName: string

    @Field({nullable: true})
    ProfilePic: string

    @Field({nullable: true})
    Description: string

    @Field({nullable: true})
    Rating: number

}

