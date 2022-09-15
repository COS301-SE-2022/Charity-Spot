import { Injectable, Type } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { catagory, quality } from '@prisma/client';

@Injectable()
export class DonateRepository {
  constructor(private prisma: PrismaService) {}

  async AddItem(itemName, orgID: string, quantity : number, Quality : quality, type: catagory)
  {

    let tempDate = "3,1";
    let tempLoc = "Pretoria";
    let tempAvail = true;

    return await this.prisma.donoItem.create({
      
      data:
      {
        ItemName : itemName,
        OrgID : orgID,
        Quantity : quantity,
        Quality : Quality,
        Type : type,
        DonoDate: tempDate,
        DonoLoc: tempLoc,
        ItemAvail: tempAvail
      }
    })
  }

  async getItemList(uID : string)
  {
    return await this.prisma.donoItem.findMany({
      where:
      {
        OrgID: uID,
        ItemAvail: true
      },
      select:
      {
        ItemID: true,
        ItemName: true,
        Picture: true,
        Quality: true,
        Descrition: true,
        Quantity: true,
        Type: true
      }
    })
  }

 async editItemName(uID, oldName, newName : string)
 {
   return await this.prisma.donoItem.update({
     where:
     {
      ItemName_OrgID:
      {
        OrgID: uID,
        ItemName: oldName
      }
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

  async editItemDescription(uID, Name, Description : string)
  {
    return await this.prisma.donoItem.update({
      where:
      {
        ItemName_OrgID:
        {
          OrgID: uID,
          ItemName: Name
        }
      },
      data:
      {
        Descrition: Description
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

  async editItemPicture(uID, Name, Picture : string)
  {
    return await this.prisma.donoItem.update({
      where:
      {
        ItemName_OrgID:
        {
          OrgID: uID,
          ItemName: Name
        }
      },
      data:
      {
        Picture: Picture
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

  async editQuantity(uID, Name: string, Quantity : number)
  {
    return await this.prisma.donoItem.update({
      where:
      {
        ItemName_OrgID:
        {
          OrgID: uID,
          ItemName: Name
        }
      },
      data:
      {
        Quantity: Quantity
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

  async editQuality(uID, Name: string, Quality : quality)
  {
    return await this.prisma.donoItem.update({
      where:
      {
        ItemName_OrgID:
        {
          OrgID: uID,
          ItemName: Name
        }
      },
      data:
      {
        Quality: Quality
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

  async editItemType(uID : string, iName: string, type : catagory)
  {
    return await this.prisma.donoItem.update({
      where:
      {
        ItemName_OrgID:
        {
          OrgID: uID,
          ItemName: iName
        }
      },
      data:
      {
        Type : type
      }
    })
  }

  async getItemDirec(itemID : string)
  {
    return await this.prisma.donoItem.findFirst({
      where:
      {
        ItemID: itemID,
      },
      select:
      {
        Picture: true
      }
    })
  }
}