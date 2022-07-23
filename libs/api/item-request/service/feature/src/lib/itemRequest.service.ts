import { Injectable } from '@nestjs/common';
import { itemRequestEntity } from './itemRequest.entity';
import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature'

import fetch from 'node-fetch';

@Injectable()
export class itemRequestService {
    constructor(private itemRequestRepository: itemRequestRepository) {}

    async Test(){

        let temp = new itemRequestEntity();
        temp.ID = "Item Request Working!";

        return temp;

    }

    async getAIPredic(Date : string, itemType : string, location : string){

        const response = await fetch('http://localhost:7777/hello');
        const data = await response.json();

        console.log(data);

        let temp = new itemRequestEntity();
        temp.ID = "Item Request Working!";

        return temp;

    }

}