import { Module } from '@nestjs/common';
import { HomeService} from '@charity-spot/api/home/service/feature';
import { HomeResolver } from './home-resolver';
import { HomeRepository } from '@charity-spot/api/home/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { HomeServiceFeatureModule } from '@charity-spot/api/home/service/feature';


@Module({
  controllers: [],
  imports: [HomeServiceFeatureModule],
  providers: [HomeResolver, HomeService, HomeRepository, PrismaService],
  exports: [],
})
export class ApiHomeApiFeatureModule {}
