import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEntity {
    @Field({ nullable: true })
    ID: string
}