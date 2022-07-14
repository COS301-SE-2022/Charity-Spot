import { Module } from '@nestjs/common';
import { ScheduleDeliveryServiceFeatureModule } from '@charity-spot/api/schedule-delivery/service/feature'
import { ScheduleDeliveryService } from '@charity-spot/api/schedule-delivery/service/feature'
import { ScheduleDeliveryResolver } from './scheduleDelivery-resolver';
import { ScheduleDeliveryRepository } from '@charity-spot/api/schedule-delivery/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  imports: [ScheduleDeliveryServiceFeatureModule],
  providers: [ScheduleDeliveryResolver, ScheduleDeliveryService, ScheduleDeliveryRepository, PrismaService]
})
export class ApiScheduleDeliveryApiFeatureModule {}
