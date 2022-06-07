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

        //const addr = await this.OrganisationRepository.getAdress(org.AddressID);
        const addr = await this.OrganisationRepository.getAdress(userID);

        //build
        organisationProfile.Email = (await this.OrganisationRepository.getEmailFromUserID(userID)).email;
        organisationProfile.Name = org.OrgName;
        organisationProfile.Date = "##/##/####";
        organisationProfile.Location = 
            addr.Address + "," +
            addr.Address2 + "," +
            addr.City + "," +
            addr.Province
        ;

        return organisationProfile;
    }

    async updateDet(id: string, name: string, loc: string, picture: string, password: string) {
        if(name != null)
            this.OrganisationRepository.editOrgName(id, name);
        
        if(loc != null)
            this.OrganisationRepository.editAddress(id, loc, null, null, null);

        if(picture != null)
            this.OrganisationRepository.editProfilePicture(id, picture);

        if(password != null) {
            //this.OrganisationRepository.editPassword(hash(passwordd));
        }

        return this.getOrgProfile(id);
    }

    async getDonations(id: string) {
        return null;
    }
}