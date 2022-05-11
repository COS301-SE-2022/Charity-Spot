import { Module } from '@nestjs/common';
import { ApiRegistrationServiceFeatureModule } from '@charity-spot/api/registration/service/feature';
import { RegistrationService } from '@charity-spot/api/registration/service/feature';
import { RegistrationResolver } from './regist-resolver';
import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  providers: [ApiRegistrationServiceFeatureModule],
  exports: [RegistrationResolver, RegistrationService, RegistrationRepository, PrismaService],
})
export class RegistrationApiFeatureModule {}
