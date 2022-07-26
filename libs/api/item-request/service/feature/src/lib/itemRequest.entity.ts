import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class itemRequestEntity {

    @Field({ nullable: true })
    ID: string

    @Field({ nullable: true })
    Probability: string

    @Field({nullable : true})
    OrgName: string

}

