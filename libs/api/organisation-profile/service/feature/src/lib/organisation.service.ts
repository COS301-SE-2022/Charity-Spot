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
        const addr = await this.OrganisationRepository.getAdress(org.AddressID);

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
}