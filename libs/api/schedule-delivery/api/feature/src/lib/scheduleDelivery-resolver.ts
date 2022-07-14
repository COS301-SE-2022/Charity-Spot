import { Resolver, Query, Args } from '@nestjs/graphql';
import { ScheduleDeliveryService } from '@charity-spot/api/schedule-delivery/service/feature'
import { ScheduleDeliveryEntity } from '@charity-spot/api/schedule-delivery/service/feature';

@Resolver()
export class ScheduleDeliveryResolver {
    constructor(private readonly ScheduleDeliveryService: ScheduleDeliveryService) {}

    @Query(() => ScheduleDeliveryEntity)
    Test() : Promise<ScheduleDeliveryEntity>{
        
        return this.ScheduleDeliveryService.Test();
    }
}