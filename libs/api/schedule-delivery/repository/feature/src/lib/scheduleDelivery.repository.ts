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

  async CreateShedule(itemID:string, loaction: string, Time: string, ClientID: string){
    //To Be Added
  }
}
