import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class ChatRepository {
  constructor(private prisma: PrismaService) {}

  async AddMessages(orgID, clientID : string ,text: string)
  {
    const u = await this.prisma.chatHistory.create({
      data:
      {
        OrgID: orgID,
        ClientID:clientID,
        Messages:text
      }
    })

    return u;
  }
}