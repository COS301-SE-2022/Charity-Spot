import { Module } from '@nestjs/common';
import { LoginServiceFeatureModule } from '@charity-spot/login/service/feature'
import { LoginService } from '@charity-spot/login/service/feature';
import { LoginResolver } from './login-resolver';
import { LoginRepository } from '@charity-spot/login/repository/data-access';
import { PrismaService } from '@charity-spot/shared/services/prisma';

@Module({
  controllers: [],
  imports: [LoginServiceFeatureModule],
  providers: [LoginResolver, LoginService, LoginRepository, PrismaService]
})
export class LoginApiFeatureModule {}
