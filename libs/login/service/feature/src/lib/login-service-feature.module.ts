import { Module } from '@nestjs/common';
import { LoginEntity } from './login.entity';

@Module({
  controllers: [],
  providers: [LoginEntity],
  exports: [LoginEntity],
})
export class LoginServiceFeatureModule {}
