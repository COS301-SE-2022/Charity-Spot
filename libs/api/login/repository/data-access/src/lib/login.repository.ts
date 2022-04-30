import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) {}

  async getNames(){

    const users = await this.prisma.user.findMany();

    return users;
  }

}