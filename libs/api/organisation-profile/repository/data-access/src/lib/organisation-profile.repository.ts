import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { useId } from 'react';

@Injectable()
export class OrganisationRepository {
  constructor(private prisma: PrismaService) {}

  async getEmailFromUserID(uID : string)
  {
    return await this.prisma.user.findFirst({
      where:
      {
        UserID: uID,
      },
      select:
      {
        email: true
      }
    })
  }

  async getOrg(userID : string)
  {
    return await this.prisma.organisation.findFirst({
      where:
      {
        UserID:userID
      },
      select:
      {
        OrgName:true,
        NGONum:true,
        Description:true,
        AddressID:true
      }
    })
  }

  async getAdress(addressID : string)
  {
    return await this.prisma.address.findFirst({
      where:
      {
        AddressID:addressID
      },
      select:
      {
        Address:true,
        Address2:true,
        City:true,
        Province:true
      }
    })
  }

  async getRating(OrgID : string)
  {
    return await this.prisma.rating.findMany({
      where:
      {
        OrgID:OrgID
      },
      select:
      {
        ClientID:true,
        rating:true,
        Comment:true
      }
    })
  }
}