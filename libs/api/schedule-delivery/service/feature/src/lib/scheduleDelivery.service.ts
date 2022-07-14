import { Injectable } from '@nestjs/common';
import { ScheduleDeliveryEntity } from './scheduleDelivery.entity';
import { ScheduleDeliveryRepository } from '@charity-spot/api/schedule-delivery/repository/feature'

@Injectable()
export class ScheduleDeliveryService {
    constructor(private ScheduleDeliveryRepository: ScheduleDeliveryRepository) {}

    async Test(){

        let temp = new ScheduleDeliveryEntity();
        temp.ID = "Schedule Delivery Working!";

        return temp;
    }

}