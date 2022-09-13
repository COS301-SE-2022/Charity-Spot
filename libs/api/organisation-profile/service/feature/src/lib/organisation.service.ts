import { Injectable } from '@nestjs/common';
import { OrganisationEntity } from './organisation.entity';
import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';

import {CommentRatingRepository} from '@charity-spot/api/comment-rating/repository/data-access';

@Injectable()
export class OrganisationService {
    constructor(private OrganisationRepository: OrganisationRepository, private CommentRatingRepository: CommentRatingRepository) {}

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


        //build up
        //if(user.identity == "ASSIST") {
            const addr = await this.OrganisationRepository.getAdress(userID);
            const org = await this.OrganisationRepository.getOrg(userID);
            date = (await this.OrganisationRepository.getDateCreated(userID)).dateCreated;
            organisationProfile.Email = user.email;
            organisationProfile.Name = org.OrgName;
            organisationProfile.Description = org.Description;
            console.log(date);
            organisationProfile.Date = date.toDateString();
            organisationProfile.Location = addr.City + ", " + addr.Province;
            organisationProfile.Internal = "ASSIST";
        //} else {
            organisationProfile.Email = user.email;
            organisationProfile.Internal = user.identity;
        //}

        return organisationProfile;
    }

    async updateDet(id: string, name: string, loc: string, picture: string, password: string) {
        if(name != null)
            this.OrganisationRepository.editOrgName(id, name);
        
        if(loc != null){
            this.OrganisationRepository.editAddress(id, loc, undefined, undefined, undefined);}

        if(picture != null)
            this.OrganisationRepository.editProfilePicture(id, picture);

        if(password != null) {
            this.OrganisationRepository.editPassword(id, password);
        }

        return this.getOrgProfile(id);
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