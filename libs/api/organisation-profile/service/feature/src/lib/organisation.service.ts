import { Injectable } from '@nestjs/common';
import { OrganisationEntity } from './organisation.entity';
import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';

@Injectable()
export class OrganisationService {
    constructor(private OrganisationRepository: OrganisationRepository) {}

    async getOrgProfile(userID: string) {
        //helpers
        const organisationProfile = new OrganisationEntity();
        const org = await this.OrganisationRepository.getOrg(userID);
        const date = (await this.OrganisationRepository.getDateCreated(userID)).dateCreated;

        //const addr = await this.OrganisationRepository.getAdress(org.AddressID);
        //this needs a fix to accommodate google maps api
        const addr = await this.OrganisationRepository.getAdress(userID);

        //build
        organisationProfile.Email = (await this.OrganisationRepository.getEmailFromUserID(userID)).email;
        organisationProfile.Name = org.OrgName;
        organisationProfile.Date = date.toDateString();
        /*organisationProfile.Location = 
            addr.Address + "," +
            addr.Address2 + "," +
            addr.City + "," +
            addr.Province
        ;*/
        organisationProfile.Location = 
            addr.Address;

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