import { Injectable } from '@nestjs/common';
import { NotificationEntity } from './notification.entity'
import { NotificationRepository } from '@charity-spot/api/notification/repository/feature'
import { ChatEntity } from '@charity-spot/api/chat/service/feature';
import { ScheduleDeliveryEntity} from '@charity-spot/api/schedule-delivery/service/feature'

@Injectable()
export class NotificationService {
    constructor(private NotificationRepository: NotificationRepository) {}

    async getNotifications(u_id: string, id: string) {
        const noti = await this.NotificationRepository.fetchNotifications(u_id, id);
        const returnable = new NotificationEntity();

        const messages = noti.notM;
        const del = noti.notD;

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

        if(del != null){
            returnable.Delivery = [];
            for(const d of del){
                const delN = new ScheduleDeliveryEntity();
                delN.id_1 = d.OrgID;
                delN.id_2 = d.ItemID;
                returnable.Delivery.push(delN);
            }
        }
        else{
            returnable.Delivery = [];
        }

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

    async checkNot(id: string, type: string){
       return await this.NotificationRepository.checkNot(id, type);
    }

}