import { Resolver, Query, Args } from '@nestjs/graphql';
import { OrganisationEntity } from '@charity-spot/api/organisation-profile/service/feature';
import { OrganisationService } from '@charity-spot/api/organisation-profile/service/feature';

@Resolver()
export class OrgResolver {
    constructor(private readonly OrganisationService: OrganisationService) {}

    @Query(() => OrganisationEntity)
    OrgProfile() : Promise<OrganisationEntity>{
        return this.OrganisationService.CoolFUNC();
    }
}