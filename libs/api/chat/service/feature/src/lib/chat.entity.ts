import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEntity {
    @Field({ nullable: false })
    Reciever: string

    @Field({nullable: false})
    Sender: string

    @Field({nullable: true})
    Message: string
}