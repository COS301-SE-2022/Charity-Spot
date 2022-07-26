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
        OrgName: true
      },
      where:
      {
        UserID: UserID,
      }
    });

    return list;

  }

}