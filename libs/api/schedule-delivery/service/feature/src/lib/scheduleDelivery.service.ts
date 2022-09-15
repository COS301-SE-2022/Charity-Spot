import { Injectable } from '@nestjs/common';
import { ScheduleDeliveryEntity } from './scheduleDelivery.entity';
import { ScheduleDeliveryRepository } from '@charity-spot/api/schedule-delivery/repository/feature'

import {Client} from "@googlemaps/google-maps-services-js";

@Injectable()
export class ScheduleDeliveryService {
    constructor(private ScheduleDeliveryRepository: ScheduleDeliveryRepository) {}

    async Sched(
        assis_id: string,
        needing_id: string,
        ite_id: string,
        location: string,
        date: string,
        time: string
    ) {
        // save data in database

        console.log(time);

        await this.ScheduleDeliveryRepository.CreateShedule(ite_id, assis_id, location, date, time, needing_id)

        const returnableV = new ScheduleDeliveryEntity();
            returnableV.id_1 = assis_id;
            returnableV.id_2 = needing_id;
            returnableV.id_item = ite_id;

        await this.ScheduleDeliveryRepository.alertClient(assis_id, needing_id, ite_id);

        let itemName = await (await this.getItemName(ite_id)).itemName;

        await this.ScheduleDeliveryRepository.setItemUnAvail(itemName, assis_id);

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

    async getDelSchedule( Userid : string, type : string){

        let schedule = await this.ScheduleDeliveryRepository.getDelSchedule(Userid, type);

        let returnSchedule = [];

        for(let i=0; i<schedule.length; i++){

            let temp = new ScheduleDeliveryEntity();

            if(type == "ASSIST"){
                temp.id_1 = schedule[i].ClientID;
            }
            else if(type == "NEED"){
                temp.id_1 = schedule[i].OrgID;
                await this.ScheduleDeliveryRepository.negateAlertClient(schedule[i].OrgID, Userid, schedule[i].ItemID)
            }
            //temp.id_1 = schedule[i].ClientID;

            console.log(schedule[i].Loaction);

            let locationT = await this.getProvCity(schedule[i].Loaction);
            let location = locationT[0] + "," + locationT[1] + "," + schedule[i].Loaction;

            temp.itemID = schedule[i].ItemID;
            temp.location = location;
            temp.date = schedule[i].Date;
            temp.time = schedule[i].Time;

            returnSchedule.push(temp);

        }

        return returnSchedule;

    }

    async getItemName( itemID : string){

        let itemName = await this.ScheduleDeliveryRepository.getItemName(itemID);

        let temp = new ScheduleDeliveryEntity();

        temp.itemName = itemName[0].ItemName;

        return temp;

    }

    async getAverageRatings(ratings : number[]){
        let total = 0;
        let count =0;

        for(let i=0; i < ratings.length; i++){
            total = total + ratings[i];
            count++;
        }

        let avg = Number((total/count).toFixed(0));

        return avg;
    }

    async getProvCity(coord : any){

		const args = {
			params: {
				key: 'AIzaSyAiR16bBkUQWf0d783c2MfjGwQUbH72nTw',
				latlng: coord,
			}
		};

		const client = new Client();
		return client.reverseGeocode(args).then(gcResponse => {
			 
		  
			const str = JSON.stringify(gcResponse.data.results[0]);
			const nStr = JSON.parse(str);

			let add_comp = nStr.address_components;

			let returnVal = ["",""]

			if(add_comp == undefined){
				return returnVal;
			}
			else{

				for(let i=0; i< add_comp.length; i++){

					if(add_comp[i].types[0] == 'administrative_area_level_1' &&  add_comp[i].types[1] == 'political'){
						returnVal[0] = add_comp[i].long_name;
					}

					if(add_comp[i].types[0] == 'locality' &&  add_comp[i].types[1] == 'political'){
						returnVal[1] = add_comp[i].long_name;
					}

				}

			}
			
			console.log(returnVal);

			return returnVal;

		}).catch(e => {console.log("error with reverse geolocation")});

	}

    async deleteDel(itemID: string){
        await this.ScheduleDeliveryRepository.deleteDel(itemID);
    }

}