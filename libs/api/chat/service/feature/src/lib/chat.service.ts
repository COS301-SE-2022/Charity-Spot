import { Injectable } from '@nestjs/common';
import { ChatEntity } from './chat.entity'
import { ChatRepository } from '@charity-spot/api/chat/repository/feature'

@Injectable()
export class ChatService {
    constructor(private ChatRepository: ChatRepository) {}

    async Send(to: string, from: string, identify: string, message: string) {

        //returnable
        const returnableV = new ChatEntity();
        returnableV.Reciever = to;
        returnableV.Sender = from;
        returnableV.Message = message;


        //retrieve file from database 
        let orgID = null, clientID = null, data = null;

        console.log(Buffer.from(message, 'utf-8').toString('base64'));

        if(identify == "ORG") { orgID = from; clientID = to; }
        else { orgID = to; clientID = from; }

        if((data = await this.ChatRepository.getThread(orgID, clientID)) != null) {

            let messages = data.Messages;
                messages = Buffer.from(messages, 'base64').toString('utf-8');
                messages = messages + message;
                message = Buffer.from(messages, 'utf-8').toString('base64');
                
            //update the file in database
            this.ChatRepository.updateThread(orgID, clientID, message);

        } else { //no chat history
           await this.ChatRepository.createThread(orgID, clientID);
           await this.ChatRepository.updateThread(orgID, clientID,  Buffer.from(message, 'utf-8').toString('base64'))
        }

        //Notify recipient
        if(identify == "ORG") 
            this.ChatRepository.alertClient(orgID, clientID);
        else 
            this.ChatRepository.alertOrg(orgID, clientID);
   
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