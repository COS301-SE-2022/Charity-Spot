import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { ChatRepository } from '@charity-spot/api/chat/repository/feature';

import { ScheduleDeliveryRepository } from '@charity-spot/api/schedule-delivery/repository/feature';

class returnV{
  notM : any;
  notD : any;
}

@Injectable()
export class NotificationRepository {
  constructor(private ChatRepository: ChatRepository, private ScheduleDeliveryRepository: ScheduleDeliveryRepository,private prisma: PrismaService) {}



  async fetchNotifications (u_id: string, id: string) {
    let messages = null;
    let del = null;

    let retV = new returnV();
    switch(id) {
      case "ASSIST":

        messages = await this.ChatRepository.GetAllChatsOrg(u_id);
        retV.notM = messages;
        retV.notD = null;
        break;

      case "NEED":

        retV.notD = null;

        del = await this.ScheduleDeliveryRepository.GetAllDelN(u_id);
        if(del.length >= 1){
          retV.notD = del;
        }

        messages = await this.ChatRepository.GetAllChatsClient(u_id);

        retV.notM = messages;
        break;
    }
    
    return retV;
  }

  async fetchReceiver(r_id: string) {
    return await this.ChatRepository.GetThreadList(r_id);
  }

  //fetch scheduled deliveries that are not seen
}