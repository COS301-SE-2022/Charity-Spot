import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

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

  async CreateShedule(itemID:string, loaction: string, Date: string, Time: string, ClientID: string){
    //To Be Added
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
      result.push(/*to add getting result from delivery table*/);
    });
  }

  //Find All Org Schedule Delivery
  
  //Will only return Deliviers IDs Run  GetDeliveryDetails to get details

  async FindAllClientDeliviries(ClientID:string){
    //To Add
  }

  //Delivery Details

  async GetDeliveryDetails(DeliveryID:string){
    //to add
  }

  //Change Date Time

  async ChangeDateTime(DeliveryID:string, Date, Time:string){
    //to add
  }
}
