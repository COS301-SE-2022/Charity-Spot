import { Injectable } from '@nestjs/common';
import { itemRequestEntity } from './itemRequest.entity';
import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature'

import fetch from 'node-fetch';

@Injectable()
export class itemRequestService {
    constructor(private itemRequestRepository: itemRequestRepository) {}

    async FindOrgInfo(OrgID){
        
        let returnV = await this.itemRequestRepository.getOrgInfo(OrgID);

        let temp = new itemRequestEntity();

        temp.OrgName = returnV[0].OrgName;
        
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

        let retList = [];

        for(let i=0; i<data.results.length;i++){

            
            let temp = new itemRequestEntity();
            temp.ID = data.results[i].OrgID;
            temp.Probability = data.results[i].Result

            retList.push(temp);



        }        
    

        return retList;

    }

}