import { Injectable } from '@nestjs/common';
import { itemRequestEntity } from './itemRequest.entity';
import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature'

@Injectable()
export class itemRequestService {
    constructor(private itemRequestRepository: itemRequestRepository) {}

    async Test(){

        let temp = new itemRequestEntity();
        temp.ID = "Item Request Working!";

        return temp;

    }

}