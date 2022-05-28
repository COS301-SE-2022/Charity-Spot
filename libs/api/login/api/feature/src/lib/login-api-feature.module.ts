import { Module } from '@nestjs/common';
import { LoginServiceFeatureModule } from '@charity-spot/api/login/service/feature'
import { LoginService } from '@charity-spot/api/login/service/feature';
import { LoginResolver } from './login-resolver';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

import { FirebaseService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  imports: [LoginServiceFeatureModule],
  providers: [LoginResolver, LoginService, LoginRepository, PrismaService, FirebaseService]
})
export class LoginApiFeatureModule {}
