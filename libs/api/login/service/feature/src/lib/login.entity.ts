import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginEntity {
    @Field({ nullable: true })
    ID: string

    @Field({nullable: true})
    ID_EXT: string
}