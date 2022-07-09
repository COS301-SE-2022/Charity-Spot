import { Resolver, Query, Args } from '@nestjs/graphql';
import { ChatEntity } from '@charity-spot/api/chat/service/feature'
import { ChatService } from '@charity-spot/api/chat/service/feature';

@Resolver()
export class ChatResolver {
    constructor(private readonly ChatService: ChatService) {}

    @Query(() => ChatEntity)
    async Send(
        @Args("receiverID") to: string,
        @Args("senderID") from: string,
        @Args("message") message: string
    ) {
        const date = new Date();

        const message_
            = "[" + from + "_"
            + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "_"
            + date.getHours + ":" + date.getMinutes() + "] - "
            + message;

        return this.ChatService.Send(to, from, message);
    }

    @Query(() => ChatEntity)
    async RetrieveMessages(
        @Args("userID") id: string
    ) {
        return null;
    }
}