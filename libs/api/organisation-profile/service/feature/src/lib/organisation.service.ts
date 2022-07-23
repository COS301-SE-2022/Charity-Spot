import { Injectable } from '@nestjs/common';
import { OrganisationEntity } from './organisation.entity';
import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';

@Injectable()
export class OrganisationService {
    constructor(private OrganisationRepository: OrganisationRepository) {}

    async getOrgProfile(userID: string) {
        //helpers
        const organisationProfile = new OrganisationEntity();
        const user = await this.OrganisationRepository.getUser(userID);
        let date = null;


        //build up
        if(user.identity == "ORG") {
            const addr = await this.OrganisationRepository.getAdress(userID);
            const org = await this.OrganisationRepository.getOrg(userID);
            date = (await this.OrganisationRepository.getDateCreated(userID)).dateCreated;
            organisationProfile.Email = user.email;
            organisationProfile.Name = org.OrgName;
            console.log(date);
            organisationProfile.Date = date.toDateString();
            organisationProfile.Location = 
                addr.Address;
            organisationProfile.Internal = "ORG";
        } else {
            organisationProfile.Email = user.email;
            organisationProfile.Internal = user.identity;
        }

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
}