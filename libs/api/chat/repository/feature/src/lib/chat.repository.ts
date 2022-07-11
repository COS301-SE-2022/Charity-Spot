import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { ClientLogin } from '@charity-spot/client/login';
import { Alert } from 'react-native';

@Injectable()
export class ChatRepository {
  constructor(private prisma: PrismaService) {}

  async createThread(orgID, clientID : string)
  {
    const u = await this.prisma.chatHistory.create({
      data:
      {
        OrgID: orgID,
        ClientID:clientID
      }
    })

    return u;
  }

  async getThread(orgID, clientID : string)
  {
    const u = await this.prisma.chatHistory.findUnique({
      where:
      {
        OrgID_ClientID:
        {
          OrgID: orgID,
          ClientID:clientID,
        }
      }
    })

    return u;
  }

  async OrgSendsMessage(orgID, clientID : string ,text: string)
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
        Messages:text,
        AlertOrg: false,
        AlertClient: true
      }
    })

    return u;
  }

  async ClientSendsMessage(orgID, clientID : string ,text: string)
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
        Messages:text,
        AlertOrg: true,
        AlertClient: false
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