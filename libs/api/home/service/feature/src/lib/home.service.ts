import { Injectable } from '@nestjs/common';
import { HomeEntity } from './home.entity';
import { HomeRepository } from '@charity-spot/api/home/repository/data-access'

import {AddressType, Client, PlaceType1, PlaceType2} from "@googlemaps/google-maps-services-js";

@Injectable()
export class HomeService {
    constructor(private HomeRepository: HomeRepository) {}

    async getAllOrg(){

        let orgs = await this.HomeRepository.getAllOrg();

        let returnOrg = [];

        for(let i=0 ; i < orgs.length; i++){

            let returnEnt = new HomeEntity();
            returnEnt.ID = orgs[i].UserID;
            returnEnt.Name = orgs[i].OrgName;

            let addObj = await this.HomeRepository.getAddressFromID(orgs[i].AddressID);

            returnEnt.Address = addObj[0].Address;

            returnOrg.push(returnEnt);

        }

        return returnOrg;
    }

    async getAllItems(){

        //const client = new Client({});

        //let temp = new LatLng()

        //let addType : AddressType[] = [PlaceType2.administrative_area_level_1, PlaceType2.political]

        const args = {
               params: {
                 key: 'AIzaSyDMc1Ul219yxqzlqQerJBrQ_KdwHnkJnMo',
                 latlng: '-25.7479, 28.2293',
                 //result_type: addType
               }
             };
             const client = new Client();
             client.reverseGeocode(args).then(gcResponse => {
                
             
            const str = JSON.stringify(gcResponse.data.results[0]);
            const nStr = JSON.parse(str);

            let add_comp = nStr.address_components;

            if(add_comp == undefined){
                
            }
            else{
                
            }
              
             

            }).catch(e => {console.log("error with reverse geolocation")});
             

        let temp = new HomeEntity();

        let items = await this.HomeRepository.getAllItems();

        let retItem : any = []

        for(let i=0; i<items.length; i++){

            let temp = new HomeEntity();

            //temp.ItemName = items[i].ItemName;
            temp.OrgID = items[i].ID;
            temp.Name = items[i].Name
            temp.Type = items[i].Type;
            temp.Location = items[i].Location;
            
            retItem.push(temp);
        }

        return retItem;
    }

    
}