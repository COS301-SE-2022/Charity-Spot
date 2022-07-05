import { Injectable } from '@nestjs/common';
import { ChatEntity } from './chat.entity'
import { ChatRepository } from '@charity-spot/api/chat/repository/feature'

@Injectable()
export class ChatService {
    constructor(private ChatRepository: ChatRepository) {}

    async TestFunc() {
        const entity = new ChatEntity();
        entity.ID = "Chat is working!";
        return entity;
    }

}