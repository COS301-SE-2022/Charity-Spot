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
        OrgName: true
      }

    })
  }
}