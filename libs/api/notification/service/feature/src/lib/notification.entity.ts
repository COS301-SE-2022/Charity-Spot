import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatEntity } from '@charity-spot/api/chat/service/feature';

@ObjectType()
export class NotificationEntity {

    @Field({ nullable: true})
    ID: string

    @Field(() => [ChatEntity], {nullable: true})
    Threads: ChatEntity[]

}