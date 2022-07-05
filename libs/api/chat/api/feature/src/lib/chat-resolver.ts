import { Resolver, Query, Args } from '@nestjs/graphql';
import { ChatEntity } from '@charity-spot/api/chat/service/feature'
import { ChatService } from '@charity-spot/api/chat/service/feature';

@Resolver()
export class ChatResolver {
    constructor(private readonly ChatService: ChatService) {}

    @Query(() => ChatEntity)
    ChatTest() : Promise<ChatEntity>{
        
        return this.ChatService.TestFunc();
    }
}