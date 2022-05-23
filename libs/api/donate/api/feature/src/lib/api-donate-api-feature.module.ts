import { Module } from '@nestjs/common';
import { ApiDonateServiceFeatureModule} from '@charity-spot/api/donate/service/feature';
import { DonateService } from '@charity-spot/api/donate/service/feature';
import { DonateResolver} from './donate-resolver'
import { DonateRepository } from '@charity-spot/api/donate/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  imports: [ApiDonateServiceFeatureModule],
  providers: [DonateResolver, DonateService, DonateRepository, PrismaService]
})
export class ApiDonateApiFeatureModule {}
