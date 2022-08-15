import { Resolver, Query, Args } from '@nestjs/graphql';
import { ScheduleDeliveryService } from '@charity-spot/api/schedule-delivery/service/feature'
import { ScheduleDeliveryEntity } from '@charity-spot/api/schedule-delivery/service/feature';

@Resolver()
export class ScheduleDeliveryResolver {
    constructor(private readonly ScheduleDeliveryService: ScheduleDeliveryService) {}

    /*query{
        Schedule(donated_by:"",donated_for:"",location:"",dd_mm_yyyy:"",itemID:""){
          id_1
        }
      }*/

    @Query(() => ScheduleDeliveryEntity)
    Schedule(
        @Args("donated_by") id_1: string,
        @Args("donated_for") id_2: string,
        @Args("location") loc: string,
        @Args("dd_mm_yyyy") date: string,
        @Args("itemID") id_item: string
    ) {
        return this.ScheduleDeliveryService.Sched(
            id_1,
            id_2,
            id_item,
            loc,
            date
        );
    }

    @Query(() => ScheduleDeliveryEntity)
    History(
        @Args("userid") id: string
    ) {
        return this.ScheduleDeliveryService.History(id);
    }

    @Query(() => [ScheduleDeliveryEntity])
    GetAvailItems(@Args("UserID") UserID: string){

        return this.ScheduleDeliveryService.getAvailItems(UserID);
    }

    @Query(() => [ScheduleDeliveryEntity])
    getDelSchedule(@Args("UserID") UserID: string, @Args("type") type : string){
        return this.ScheduleDeliveryService.getDelSchedule(UserID, type);
    }

    @Query(() => ScheduleDeliveryEntity)
    getItemName(@Args("ItemID") ItemID: string){
        return this.ScheduleDeliveryService.getItemName(ItemID);
    }
}