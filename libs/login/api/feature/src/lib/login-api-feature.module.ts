import { Module } from '@nestjs/common';
import { LoginServiceFeatureModule } from '@charity-spot/login/service/feature'
import { LoginService } from '@charity-spot/login/service/feature';
import { LoginResolver } from './login-resolver';

@Module({
  controllers: [],
  imports: [LoginServiceFeatureModule],
  providers: [LoginResolver, LoginService]
})
export class LoginApiFeatureModule {}
