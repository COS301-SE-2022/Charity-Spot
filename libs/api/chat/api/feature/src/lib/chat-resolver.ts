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
        @Args("sentBy") sender: "ORG" | "CLIENT",
        @Args("message") message: string
    ) {
        const date = new Date();

        const message_
            = "[" + from + "_"
            + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "_"
            + date.getHours() + ":" + date.getMinutes() + "] - "
            + message;

        return this.ChatService.Send(to, from, sender, message_);
    }

    @Query(() => ChatEntity)
    async RetrieveMessages(
        @Args("userID") u_id: string,
        @Args("with_ID") w_id: string,
        @Args("whois") identification: "ORG" | "CLIENT"
    ) {
        return this.ChatService.RetrieveThread(u_id, w_id, identification);
    }

    @Query(() => ChatEntity)
    async RetrieveThreads(
        @Args("userID") u_id: string,
        @Args("whois") identity: string
    ) {
        return this.ChatService.RetrieveThreads(u_id, identity);
    }

    @Query(() => ChatEntity)
    async getChatName(@Args("userID") u_id: string){
        return this.ChatService.getChatName(u_id);
    }
}