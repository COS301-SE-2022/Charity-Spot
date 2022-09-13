import { Injectable } from "@nestjs/common";
import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access'
import { RegistEntity } from "./regist-entity";
import { spices } from "@charity-spot/api/shared/auth";
import { direct } from "@charity-spot/api/shared/auth";

import {Client} from "@googlemaps/google-maps-services-js";

 
@Injectable()
export class RegistrationService {
	constructor (
		private RegistRepo: RegistrationRepository
		) {}

	async regClient(id: string, flier: string, pin: string, hack: string) {

		const returnableV = new RegistEntity();
		const spice = await spices(flier);
		let runner = null;

		if((runner = await this.RegistRepo.addUser(flier, spice, await direct(flier, hack, spice), "NEED")) != null) {
			await this.RegistRepo.addOrg(runner.UserID, id);
			returnableV.ID_external = runner.identity;
			returnableV.ID_internal = runner.UserID;

			this.getProvCity(pin).then(async tempProvCity => {
				await this.RegistRepo.AlterAdress(runner.UserID, pin, tempProvCity[1], tempProvCity[0]);
			});
		}

		return returnableV;
	}

	async regOrg(badge: string, relay: string, rendezvous: string, riddle: string) {
		const returnableV = new RegistEntity();
		const spice = await spices(relay);
		let runner = null;

		if((runner = await this.RegistRepo.addUser(relay, spice, await direct(relay, riddle, spice), "ASSIST")) != null) {
			await this.RegistRepo.addOrg(runner.UserID, badge);
			returnableV.ID_external = runner.identity;
			returnableV.ID_internal = runner.UserID;
			
			this.getProvCity(rendezvous).then(async tempProvCity => {
				await this.RegistRepo.AlterAdress(runner.UserID, rendezvous, tempProvCity[1], tempProvCity[0]);
			});
		}

		return returnableV;
	}

	async setItemPicName(id, pic){

        await this.RegistRepo.editItemPicture(id, pic);

    }

	async getProvCity(coord : any){

		const args = {
			params: {
				key: 'AIzaSyDMc1Ul219yxqzlqQerJBrQ_KdwHnkJnMo',
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
}