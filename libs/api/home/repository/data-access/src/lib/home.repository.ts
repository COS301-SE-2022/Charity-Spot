import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

class orgTypeDonation{
  ID : string = ""
  Name : string = ""
  Type : string = ""
  Location : string = ""
  Province : string = ""
  City : string = ""
}

@Injectable()
export class HomeRepository {
  constructor(private prisma: PrismaService) {}

  async getAllOrg(){

    return await this.prisma.organisation.findMany({
      select:
      {
        UserID: true,
        OrgName: true,
        AddressID: true
      }

    })
  }

  async getAddressFromID(addID : string){

    return await this.prisma.address.findMany({
      select:
      {
        Address: true
      },
      where:
      {
        AddressID: addID
      }

    });

  }

  async getAllItems(){

      let mostDonatedList : any= await this.prisma.donoItem.groupBy({
        by: ['OrgID','Type'],
        _count: {
          ItemID: true
        },
      });


      let finalList = [];

      for(let i=0; i< mostDonatedList.length; i++){

        let OrgID = mostDonatedList[i].OrgID;

        if(this.checkIfExistInList(OrgID, finalList) == false){

          let mostType = this.findMostDonatedType(OrgID, mostDonatedList);

          let temp = new orgTypeDonation();
          temp.ID = OrgID;
          temp.Type = mostType;

          finalList.push(temp);
        }

      }

      

    for(let i=0; i< finalList.length; i++){

      let tempOrg = await this.prisma.organisation.findUnique({
        where:
        {
          UserID : finalList[i].ID
        },
        select: 
        {
          OrgName : true,
          AddressID : true
        }
      });

      let tempAdd = await this.prisma.address.findUnique({
        where:
        {
          AddressID : tempOrg.AddressID
        },
        select:
        {
          Address : true,
          City : true,
          Province : true
        }
      });

      finalList[i].Name = tempOrg.OrgName;
      finalList[i].Location = tempAdd.Address;
      finalList[i].Province = tempAdd.Province;
      finalList[i].City = tempAdd.City;

    }

    return finalList;


    /*return await this.prisma.donoItem.findMany({
      select:
      {
        ItemName: true,
        OrgID: true,
        Type: true,
        DonoLoc: true
      }

    });*/

  }

  findMostDonatedType(ID : any, listCount : any){

    let maxCount = 0;
    let type = "CLOTHING";

    //find first val;
    for(let i=0; i< listCount.length; i++){

      if(listCount[i].OrgID == ID){
        maxCount = listCount[i]._count.ItemID;
        type = listCount[i].Type;
        break;
      }

    }

    //find most donated type
    for(let i=0; i< listCount.length; i++){

      if(listCount[i].OrgID == ID && (listCount[i]._count.ItemID > maxCount)){
        maxCount = listCount[i]._count.ItemID;
        type = listCount[i].Type;
      }

    }

    return type;
  }

  checkIfExistInList(ID : any, list: any){

    for(let i=0; i< list.length; i++){

      if(list[i].ID == ID){
        return true
      }

    }

    return false;

  }

  
}