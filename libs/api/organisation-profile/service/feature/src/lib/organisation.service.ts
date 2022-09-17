import { Injectable } from '@nestjs/common';
import { OrganisationEntity } from './organisation.entity';
import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';

import {CommentRatingRepository} from '@charity-spot/api/comment-rating/repository/data-access';

import {Client} from "@googlemaps/google-maps-services-js";

import { RegistrationService } from '@charity-spot/api/registration/service/feature'

import { direct, spices, base_64_direct, base_64_invert } from '@charity-spot/api/shared/auth';

@Injectable()
export class OrganisationService {
    constructor(private OrganisationRepository: OrganisationRepository, private CommentRatingRepository: CommentRatingRepository, private RegistrationService: RegistrationService) {}

    async getOrgProfile(userID: string) {

        //helpers
        const organisationProfile = new OrganisationEntity();
        const user = await this.OrganisationRepository.getUser(userID);
        let date = null;

        await this.getAllRatingsOfAssist(userID).then( async (val1) => {
            await this.getAverageRatings(val1).then((avg) => {
                organisationProfile.AvgRating = avg;
            })
        });
            const addr = await this.OrganisationRepository.getAdress(userID);
            const org = await this.OrganisationRepository.getOrg(userID);
            date = (await this.OrganisationRepository.getDateCreated(userID)).dateCreated;
            organisationProfile.Email = user.email;
            organisationProfile.Name = org.OrgName;
            organisationProfile.Description = org.Description;
            organisationProfile.Picture = await base_64_invert(org.profilePicture);
            organisationProfile.Date = date.toDateString();
            organisationProfile.Location = addr.City + ", " + addr.Province;
            organisationProfile.Internal = user.identity;

        return organisationProfile;
    }

    async updateDet(id: string, name: string, loc: string, picture: string, password: string, description: string, email: string) {
        const organisationProfile = new OrganisationEntity();

        console.log(name, loc, picture, password, description);

        if(name != null)
            await this.OrganisationRepository.editOrgName(id, name);

        if(picture != null)
            await this.OrganisationRepository.editProfilePicture(id, await base_64_direct(picture));

        if(password != null) {
            const spice = await spices(email);
            await direct(email, password, spice).then(async (glow)=>{
                await this.OrganisationRepository.editPassword(id, glow, spice);
            })
        }

        if(description != null){
            await this.OrganisationRepository.editOrgDesc(id, description);
        }
        
        if(loc != null){

            return this.getProvCity(loc).then(async tempProvCity => {
				await this.OrganisationRepository.editAddress(id, loc, tempProvCity[1], tempProvCity[0]);
                organisationProfile.Name = "working";
                return organisationProfile;
			});
        }

    }

    async getDonations(id: string) {
        return null;
    }

    //For Rating

    async getAllRatingsOfAssist(AssistID: string) {
        let dataset = null;
        let Ratings = [];
        //const returnable = new CommentRatingEntity();
        if((dataset = await this.CommentRatingRepository.getRatingsForAssist(AssistID)) != null) {
            //returnable.AssistID = AssistID;
            //returnable.Clients = [];
            //returnable.Ratings = [];
            for(const k of dataset) {
                //returnable.Clients.push(k.ClientID);
                Ratings.push(k.Rating);
            }
            return Ratings;
        }

        //no data from database
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
}