import { Module } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  providers: [PrismaService]
})
export class ApiNotificationServiceFeatureModule {}
