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

        if(identify == "assist") { orgID = from; clientID = to; }
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
        if(identify == "assist") 
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

        if(id == "assist") { 
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
            case "assist":
                data = await this.ChatRepository.GetAllChatsOrg(userID);

                console.log(data);

                if(data != null)
                    for(const i of data) {
                        const ik = new ChatEntity();
                        const user = await this.ChatRepository.GetUserForThreadList(i.ClientID);
                        //ik.Sender = user.email;
                        //ik.Reciever = "";
                        //ik.Message = i.ClientID;
                        ik.Sender = userID;
                        ik.Reciever = i.ClientID;
                        ik.Message = user.OrgName; 

                        returnableV.Threads.push(ik);
                    }

                break;

            case "need":
                data = await this.ChatRepository.GetAllChatsClient(userID);
                //console.log(data);

                if( data != null)
                for(const i of data) {
                    const ik = new ChatEntity();
                    const user = await this.ChatRepository.GetOrgForThreadList(i.OrgID);
                    /*ik.Sender = user.OrgName;
                    ik.Reciever = user.profilePicture;
                    ik.Message = i.OrgID;*/
                    ik.Sender = userID;
                    ik.Reciever = i.OrgID;
                    ik.Message = user.OrgName;  

                    returnableV.Threads.push(ik);
                }

                break;
        }

        //console.log(returnableV);

        return returnableV
    }

    async getChatName(u_id: string){

        let name = await this.ChatRepository.getChatName(u_id);

        let temp = new ChatEntity();
        temp.Message = name.OrgName;

        return temp;

    }
}