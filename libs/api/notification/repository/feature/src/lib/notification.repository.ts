import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { ChatRepository } from '@charity-spot/api/chat/repository/feature';

@Injectable()
export class NotificationRepository {
  constructor(private ChatRepository: ChatRepository, private prisma: PrismaService) {}

  async fetchNotifications (u_id: string, id: string) {
    let messages = null;
    switch(id) {
      case "ASSIST":
        messages = await this.ChatRepository.GetAllChatsOrg(u_id);
        break;
      case "NEED":
        messages = await this.ChatRepository.GetAllChatsClient(u_id);
        break;
    }

    console.log(messages);
    
    return messages;
  }

  async fetchReceiver(r_id: string) {
    return await this.ChatRepository.GetThreadList(r_id);
  }

  //fetch scheduled deliveries that are not seen
}