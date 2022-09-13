import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { time } from 'console';

@Injectable()
export class ScheduleDeliveryRepository {
  constructor(private prisma: PrismaService) {}

  //Get All Orgs with the desired Item

  async GetListOfOrgsWithItem(itemName:string){
    const u = await this.prisma.donoItem.findMany({
      select:
      {
        ItemID : true,
        OrgID : true
      },
      where:
      {
        ItemName: itemName
      }
    });

    return u;
  }

  //Schedule Delivery

  async CreateShedule(itemID:string, orgID:string, loaction: string, Date: string, Time: string, ClientID: string){
    //To Be Added
    const u = await this.prisma.delivery.create({
      data:
      {
        ItemID:itemID,
        OrgID:orgID,
        ClientID:ClientID,
        Loaction:loaction,
        Date:Date,
        Time:Time
      }
    });

    return u;
  }

  //Find All Org Schedule Delivery
  
  //Will only return Deliviers IDs Run  GetDeliveryDetails to get details

  async FindAllOrgDeliviries(OrgID:string){
    const u = await this.prisma.donoItem.findMany({
      select:
      {
        ItemID : true
      },
      where:
      {
        OrgID: OrgID
      }
    });

    let result;

    u.forEach(item => {
      result.push(this.prisma.delivery.findMany({
        select:
        {
          DeliveryID : true
        },
        where:
        {
          ItemID: item.ItemID
        }
      }));
    });

    return result;
  }

  //Find All Org Schedule Delivery
  
  //Will only return Deliviers IDs Run  GetDeliveryDetails to get details

  async FindAllClientDeliviries(ClientID:string){
    //To Add

    const u = await this.prisma.delivery.findMany({
      where:
      {
        ClientID:ClientID
      }
    });

    return u;
  }

  //Delivery Details

  async GetDeliveryDetails(DeliveryID:string){
    //to add
    const u = await this.prisma.delivery.findFirst({
      select:
      {
        ItemID:true,
        OrgID:true,
        ClientID:true,
        Loaction:true,
        Date:true,
        Time:true
      },
      where:
      {
        DeliveryID:DeliveryID
      }
    });

    return u;
  }

  //Change Date Time

  async ChangeDateTime(DeliveryID:string, Date, Time:string){
    //to add
    const u = await this.prisma.delivery.update({
      data:
      {
        Date:Date,
        Time:Time
      },
      where:
      {
        DeliveryID:DeliveryID
      }
    });

    return u;
  }

  async getAvailItems( Userid: string){

    const u = await this.prisma.donoItem.findMany({
      select:
      {
        ItemID: true,
        ItemName: true
      },
      where:
      {
        OrgID:Userid,
        ItemAvail:true
      }
    });

    return u;

  }

  async setItemUnAvail( itemName: string, orgID: string){

    await this.prisma.donoItem.update({
      data:{
        ItemAvail: false
      },
      where:{
        ItemName_OrgID:{
          OrgID: orgID,
          ItemName: itemName
        }
      }
    });

  }

  async getDelSchedule( Userid : string, type : string){

    let u = null;

    if(type=="ASSIST"){

      u = await this.prisma.delivery.findMany({
        select:
        {
          ItemID: true,
          ClientID: true,
          Loaction: true,
          Date: true,
          Time: true
        },
        where:
        {
          OrgID:Userid,
        }
      });

    }
    else if(type=="NEED"){

      u = await this.prisma.delivery.findMany({
        select:
        {
          ItemID: true,
          OrgID: true,
          Loaction: true,
          Date: true,
          Time: true
        },
        where:
        {
          ClientID:Userid,
        }
      });

    }

    return u;

  }

  async getItemName(ItemID : string){

    const u = await this.prisma.donoItem.findMany({
      select:
      {
        ItemName: true,
      },
      where:
      {
        ItemID: ItemID
      }
    });

    return u;

  }

  /////////
  async alertClient(orgID: string, clientID: string, itemID: string) {

    console.log(orgID + " " + clientID + " " + itemID);

    const u = await this.prisma.delivery.updateMany({
      where:
      {
        OrgID: orgID,
        ClientID: clientID,
        ItemID: itemID,
      },
      data: {
        AlertClient : true,
      },
    });

    return u;
  }

  async negateAlertClient(orgID: string, clientID: string, itemID) {
    
    const u = await this.prisma.delivery.updateMany({
      where:
      {
        OrgID: orgID,
        ClientID: clientID,
        ItemID: itemID,
      },
      data: {
        AlertClient : false,
      },
    });

    return u;

  }

  async GetAllDelN(ID : string)
  {
    const u = await this.prisma.delivery.findMany({
      where:
      {
        ClientID: ID,
        AlertClient: true,
      },
      select:
      {
        OrgID : true,
        ItemID: true
      }
    })

    return u;
  }

}
