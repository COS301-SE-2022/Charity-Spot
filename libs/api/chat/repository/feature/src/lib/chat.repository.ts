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

  //Find all clients that have a chat with an Org

  async GetAllChatsOrg(orgID : string)
  {
    const u = await this.prisma.chatHistory.findMany({
      where:
      {
        OrgID: orgID
      },
      select:
      {
        ClientID :true
      }
    })

    return u;
  }

  //Find all Orgs that have a chat with Client

  async GetAllChatsClient(ClientID : string)
  {
    const u = await this.prisma.chatHistory.findMany({
      where:
      {
        ClientID: ClientID
      },
      select:
      {
        OrgID :true
      }
    })

    return u;
  }

  async RemoveChat(orgID, clientID : string)
  {
    const u = await this.prisma.chatHistory.delete({
      where:
      {
        OrgID_ClientID :
        {
          OrgID:orgID,
          ClientID:clientID
        }
      }
    })

    return u;
  }
}