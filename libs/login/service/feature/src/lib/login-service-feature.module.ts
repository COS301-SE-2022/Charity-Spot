import { Module } from '@nestjs/common';
import { PrismaService } from '@charity-spot/shared/services/prisma';


@Module({
  controllers: [],
  providers: [PrismaService]
})
export class LoginServiceFeatureModule {}
