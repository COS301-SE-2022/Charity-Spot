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
                 latlng: '-29.8587, 31.0218',
                 //result_type: addType
               }
             };
             const client = new Client();
             client.reverseGeocode(args).then(gcResponse => {
                
             
            const str = JSON.stringify(gcResponse.data.results[0]);
            const nStr = JSON.parse(str);

            let add_comp = nStr.address_components;

            let prov = "";
            let city = "";

            if(add_comp == undefined){
                
            }
            else{

                for(let i=0; i< add_comp.length; i++){

                    if(add_comp[i].types[0] == 'administrative_area_level_1' &&  add_comp[i].types[1] == 'political'){
                        prov = add_comp[i].long_name;
                    }

                    if(add_comp[i].types[0] == 'locality' &&  add_comp[i].types[1] == 'political'){
                        city = add_comp[i].long_name;
                    }
                }
            }
              
             console.log(prov + " , " + city);

            }).catch(e => {console.log("error with reverse geolocation")});
             

        let temp = new HomeEntity();

        let items = await this.HomeRepository.getAllItems();

        let retItem : any = []

        for(let i=0; i<items.length; i++){

            let temp = new HomeEntity();

            temp.OrgID = items[i].ID;
            temp.Name = items[i].Name
            temp.Type = items[i].Type;
            temp.Location = items[i].Location;
            
            retItem.push(temp);
        }

        return retItem;
    }

    
}