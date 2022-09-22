import { Injectable } from '@nestjs/common';
import { itemRequestEntity } from './itemRequest.entity';
import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature'

import fetch from 'node-fetch';

import { base_64_invert } from '@charity-spot/api/shared/auth';

@Injectable()
export class itemRequestService {
    constructor(private itemRequestRepository: itemRequestRepository) {}

    async FindOrgInfo(OrgID){
        
        let returnV = await this.itemRequestRepository.getOrgInfo(OrgID);

        let temp = new itemRequestEntity();

        temp.OrgName = returnV[0].OrgName;
        temp.Rating = await this.getAverageRatings(await this.getAllRating(OrgID));
        temp.ProfilePic = await base_64_invert(returnV[0].profilePicture);
        temp.Description = returnV[0].Description;
        
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

    async getAllRating(ID: string) {
        let dataset = null;
        let Ratings = [];
        
        if((dataset = await this.itemRequestRepository.getRating(ID)) != null) {
            
            for(const k of dataset) {
                Ratings.push(k.Rating);
            }
            return Ratings;
        }
        
        return null;
    }

    async getAverageRatings(ratings : number[]){

        if(ratings.length < 1){
            return 0;
        }

        let total = 0;
        let count =0;

        for(let i=0; i < ratings.length; i++){
            total = total + ratings[i];
            count++;
        }

        let avg = Number((total/count).toFixed(0));

        return avg;
    }

}