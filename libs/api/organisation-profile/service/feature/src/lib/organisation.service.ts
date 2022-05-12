import { Injectable } from '@nestjs/common';
import { OrganisationEntity } from './organisation.entity';
import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';

@Injectable()
export class OrganisationService {
    constructor(private OrganisationRepository: OrganisationRepository) {}

    async CoolFUNC(){
        let temp = new OrganisationEntity();
        console.log("hello");

        return null;
    }
}