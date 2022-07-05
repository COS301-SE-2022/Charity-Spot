import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [PrismaService]
})
export class ApiChatServiceFeatureModule {}
