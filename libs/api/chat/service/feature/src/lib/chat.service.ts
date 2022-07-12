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

        if(identify == "ORG") { orgID = from; clientID = to; }
        else { orgID = to; clientID = from; }

        if((data = await this.ChatRepository.getThread(orgID, clientID)) != null) {

            let messages = data.Messages;
                messages = Buffer.from(messages, 'base64').toString('utf-8');
                messages = messages + "\n" + message;
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

    async RetrieveThread(userID: string, with_ID: string, id: string) {
        //allocate
        const returnableV = new ChatEntity();

        // retrieve file from database
        let orgID = null, clientID = null, data = null;

        if(id == "ORG") { 
            orgID = userID; clientID = with_ID; 
            returnableV.Reciever = clientID; returnableV.Sender = orgID;
            const threads = await this.ChatRepository.GetAllChatsOrg(orgID);

            for(const i of threads) {
                if(i.ClientID == clientID) {
                    data = await this.ChatRepository.getThread(orgID, i.ClientID);
                    break;
                }
            }

            if(data != null)
                await this.ChatRepository.negateAlertOrg(orgID, clientID);
        }
        else { 
            orgID = with_ID; clientID = userID; 
            returnableV.Reciever = orgID; returnableV.Sender = clientID;
            const threads = await this.ChatRepository.GetAllChatsClient(clientID);

            for(const i of threads) {
                if(i.OrgID == orgID) {
                    data = await this.ChatRepository.getThread(i.OrgID, clientID);
                    break;
                }
            }

            if(data != null)
                await this.ChatRepository.negateAlertClient(orgID, clientID);
        }        

        //Message to return
        if(data != null) {
            let messages = data.Messages;
                messages = Buffer.from(messages, 'base64').toString('utf-8');
                returnableV.Message = messages;
        }

        return returnableV;
    }

    async RetrieveThreads(userID: string, id: string) {
        let data = null;
        const returnableV = new ChatEntity();
            returnableV.Threads = [];

        switch(id) {
            case "ORG":
                data = await this.ChatRepository.GetAllChatsOrg(userID);

                if(data != null)
                    for(const i of data) {
                        returnableV.Threads.push(i.ClientID);
                    }

                break;

            case "CLIENT":
                data = await this.ChatRepository.GetAllChatsClient(userID);

                if( data != null)
                    for(const i of data) {
                        returnableV.Threads.push(i.OrgID);
                    }

                break;
        }

        return returnableV
    }
}