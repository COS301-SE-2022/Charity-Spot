import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class itemRequestRepository {
  constructor(private prisma: PrismaService) {}

  async getOrgInfo(UserID : string)
  {
    const list = await this.prisma.organisation.findMany({
      select:
      {
        UserID: true,
        OrgName: true,
        profilePicture: true,
        Description: true
      },
      where:
      {
        UserID: UserID,
      }
    });

    return list;

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
        Rating:true,
        Comment:true
      }
    })
  }

}