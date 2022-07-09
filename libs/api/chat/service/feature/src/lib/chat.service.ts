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

    async Send(to: string, from: string, message: string) {
        return null;
    }

    async RetrieveMessages(userID: string) {
        return null;
    }
}