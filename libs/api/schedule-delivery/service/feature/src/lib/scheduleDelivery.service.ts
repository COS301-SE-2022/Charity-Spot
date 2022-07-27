import { Injectable } from '@nestjs/common';
import { ScheduleDeliveryEntity } from './scheduleDelivery.entity';
import { ScheduleDeliveryRepository } from '@charity-spot/api/schedule-delivery/repository/feature'

@Injectable()
export class ScheduleDeliveryService {
    constructor(private ScheduleDeliveryRepository: ScheduleDeliveryRepository) {}

    async Sched(
        assis_id: string,
        needing_id: string,
        ite_id: string,
        location: string,
        date: string
    ) {
        // save data in database

        this.ScheduleDeliveryRepository.CreateShedule(ite_id, assis_id, location, date, "1", needing_id)

        const returnableV = new ScheduleDeliveryEntity();
            returnableV.id_1 = assis_id;
            returnableV.id_2 = needing_id;
            returnableV.id_item = ite_id;

        return returnableV;
    }

    async History( userid: string) {
        //get data from database

        const returnableV = new ScheduleDeliveryEntity();
            returnableV.id_1 = userid;
            returnableV.id_2 = "";
            returnableV.id_item = "";
            returnableV.History_ = [];

        return returnableV;
    }

    async getAvailItems( userid: string){

        let availItems = await this.ScheduleDeliveryRepository.getAvailItems(userid);

        let returnItems = []

        for(let i=0; i<availItems.length; i++){
            let tempItem = new ScheduleDeliveryEntity();
            tempItem.itemID = availItems[i].ItemID;
            tempItem.itemName = availItems[i].ItemName;

            returnItems.push(tempItem);
        }

        return returnItems;
    }

}