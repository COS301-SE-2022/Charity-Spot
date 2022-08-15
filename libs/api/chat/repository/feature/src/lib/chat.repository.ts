import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class ChatRepository {
  constructor(private prisma: PrismaService) {}

  //create an empty thread for messages
  async createThread(orgID: string, clientID : string)
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

  //get messages in a thread

  async getThread(orgID: string, clientID : string)
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
  
  async updateThread(orgID: string, clientID: string, text: string) {
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
        Messages: text
      }
    })

    return u;
  }

/************************************************************************************
  //Trigger when an org sends a messsage

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

  //Trigger when a client sends a message

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
  
  //**********************************************************************************/
  
  
  //Notify Organisation || Negate
  async alertOrg(orgID: string, clientID: string) {
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
        AlertOrg: true
      }
    })

    return u;
  }
  async negateAlertOrg(orgID: string, clientID: string) {
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
        AlertOrg: false
      }
    })

    return u;
  }
//=====
  //Notify Client || Negate
  async alertClient(orgID: string, clientID: string) {
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
        AlertClient: true
      }
    })

    return u;
  }
  async negateAlertClient(orgID: string, clientID: string) {
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
        AlertClient: false
      }
    })

    return u;
  }
//====

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
        ClientID :true,
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

  //misc
  async GetOrgForThreadList(id: string) {
    return await this.prisma.organisation.findUnique({
      where: {
        UserID: id
      }, select: {
        OrgName: true,
        profilePicture: true
      }
    });
  }

  async GetUserForThreadList(id: string) {
    /*return await this.prisma.user.findUnique({
      where: {
        UserID: id
      }, select: {
        email: true
      }
    });*/
    return await this.prisma.organisation.findUnique({
      where: {
        UserID: id
      }, select: {
        OrgName: true,
        profilePicture: true
      }
    });

  }

  //Remove all messages between two participants

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

  async getChatName(u_id: string){
    const u = await this.prisma.organisation.findUnique({
      where: {
        UserID: u_id
      }, select: {
        OrgName: true,
      }
    })

    return u;
  }
  
}
