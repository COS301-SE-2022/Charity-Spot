import { Injectable } from '@nestjs/common';
import { ChatEntity } from './chat.entity'
import { ChatRepository } from '@charity-spot/api/chat/repository/feature'

@Injectable()
export class ChatService {
    constructor(private ChatRepository: ChatRepository) {}

    async Send(to: string, from: string, message: string) {
        //retrieve file from database 

        let messages = "AG0AZQBzAHMAYQBnAGUAcwBfAGkAbgBfAGIAYQBzAGUANgA0";
            messages = Buffer.from(messages, 'base64').toString('utf-8');
            messages = message + message;
            message = Buffer.from(messages, 'utf-8').toString('base64');

        //update the file in database

        const returnableV = new ChatEntity();
            returnableV.Reciever = to;
            returnableV.Sender = from;
            returnableV.Message = message;

        return returnableV;
    }

    async RetrieveMessages(userID: string) {
        // retrieve file from database

        let messages = "AG0AZQBzAHMAYQBnAGUAcwBfAGkAbgBfAGIAYQBzAGUANgA0";
            messages = Buffer.from(messages, 'base64').toString('utf-8');

        const returnableV = new ChatEntity();
            returnableV.Reciever = "";
            returnableV.Sender = userID;
            returnableV.Message = messages;

        return returnableV;
    }
}