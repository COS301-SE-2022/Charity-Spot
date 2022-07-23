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

    /*The query must have this form
    query{
        getAIPredic(Date:"07-23", itemType:"1", location:"2"){
            ID
        }
    }
    */
    async getAIPredic(Date : string, itemType : string, location : string){

        const response = await fetch(`http://localhost:7777/${Date},${itemType},${location}`);
        const data = await response.json();

        console.log(data);

        let temp = new itemRequestEntity();
        temp.ID = "Item Request Working!";

        return temp;

    }

}