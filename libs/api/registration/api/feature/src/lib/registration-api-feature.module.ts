import { Module } from '@nestjs/common';
import { ApiRegistrationServiceFeatureModule } from '@charity-spot/api/registration/service/feature';
import { RegistrationService } from '@charity-spot/api/registration/service/feature';
import { RegistrationResolver } from './regist-resolver';
import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

import { LoginService } from '@charity-spot/api/login/service/feature';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';

@Module({
  controllers: [],
  providers: [ApiRegistrationServiceFeatureModule, RegistrationResolver, RegistrationService, RegistrationRepository, PrismaService, LoginService, LoginRepository],
  exports: [RegistrationResolver, RegistrationService, RegistrationRepository, PrismaService],
})
export class RegistrationApiFeatureModule {}
