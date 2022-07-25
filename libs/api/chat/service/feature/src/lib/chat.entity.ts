import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEntity {
    @Field({ nullable: true })
    Reciever: string

    @Field({nullable: true})
    Sender: string

    @Field({nullable: true})
    Message: string

    @Field(() => [ChatEntity], {nullable: true})
    Threads: ChatEntity[]
}