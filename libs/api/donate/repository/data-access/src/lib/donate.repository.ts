import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class DonateRepository {
  constructor(private prisma: PrismaService) {}

  async getItemList(uID : string)
  {
    return await this.prisma.donoItem.findMany({
      where:
      {
        OrgID: uID,
      },
      select:
      {
        ItemName: true
      }
    })
  }

 async editItemName(uID, oldName, newName : string)
 {
   return await this.prisma.donoItem.update({
     where:
     {
       OrgID: uID,
       ItemName: oldName
     },
     data:
     {
       ItemName: newName
     }
   })
 }

  async getItemDescription(uID : string, iName: string)
  {
    return await this.prisma.donoItem.findFirst({
      where:
      {
        OrgID: uID,
        ItemName: iName,
      },
      select:
      {
        Descrition: true
      }
    })
  }

  async getItemPicture(uID : string, iName: string)
  {
    return await this.prisma.donoItem.findFirst({
      where:
      {
        OrgID: uID,
        ItemName: iName,
      },
      select:
      {
        Picture: true
      }
    })
  }

  async getItemQuantity(uID : string, iName: string)
  {
    return await this.prisma.donoItem.findFirst({
      where:
      {
        OrgID: uID,
        ItemName: iName,
      },
      select:
      {
        Quantity: true
      }
    })
  }

  async getItemQuality(uID : string, iName: string)
  {
    return await this.prisma.donoItem.findFirst({
      where:
      {
        OrgID: uID,
        ItemName: iName,
      },
      select:
      {
        Quality : true
      }
    })
  }

  async getItemType(uID : string, iName: string)
  {
    return await this.prisma.donoItem.findFirst({
      where:
      {
        OrgID: uID,
        ItemName: iName,
      },
      select:
      {
        Type : true
      }
    })
  }
}