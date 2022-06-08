import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

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

  
}