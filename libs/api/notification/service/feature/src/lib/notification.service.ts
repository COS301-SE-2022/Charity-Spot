import { Injectable } from '@nestjs/common';
import { NotificationEntity } from './notification.entity'
import { NotificationRepository } from '@charity-spot/api/notification/repository/feature'
import { ChatEntity } from '@charity-spot/api/chat/service/feature';

@Injectable()
export class NotificationService {
    constructor(private NotificationRepository: NotificationRepository) {}

    async getNotifications(u_id: string, id: string) {
        const messages = await this.NotificationRepository.fetchNotifications(u_id, id);
        const returnable = new NotificationEntity();

        if(messages != null) {
            returnable.Threads = [];
            switch(id) {
                case "ASSIST":
                    for(const mess of messages) {
                        if(mess.AlertOrg) {
                            const message = new ChatEntity();
                            message.Reciever = mess.ClientID;
                            returnable.Threads.push(message);
                        }
                    }
                    break;
                case "NEED":
                    for(const mess of messages) {
                        if(mess.AlertClient) {
                            const message = new ChatEntity();
                            message.Reciever = mess.OrgID;
                            returnable.Threads.push(message);
                        }
                    }
                    break;
            }
        }

        console.log(returnable);

        returnable.ID = u_id;
        return returnable;
    }

    async getReceiver(r_id: string) {
        let returnable = null, receiver = null;
        if((receiver = await this.NotificationRepository.fetchReceiver(r_id)) != null) {
            returnable = new NotificationEntity();
            returnable.ID = r_id;
            returnable.Name = receiver.OrgName;
            returnable.ProfilePicture = receiver.profilePicture;
        }

        return returnable
    }

}