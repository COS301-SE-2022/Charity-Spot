import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { ClientLogin } from '@charity-spot/client/login';

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

  async UpdateMessages(orgID, clientID : string ,text: string)
  {
    const u = await this.prisma.chatHistory.update({
      where:
      {
        OrgID_ClientID:
        {
          OrgID: orgID,
          ClientID:clientID,
        }
      },
      data:
      {
        Messages:text
      }
    })

    return u;
  }

  
}