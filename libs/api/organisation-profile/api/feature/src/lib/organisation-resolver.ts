import { Resolver, Query, Args } from '@nestjs/graphql';
import { OrganisationEntity } from '@charity-spot/api/organisation-profile/service/feature';
import { OrganisationService } from '@charity-spot/api/organisation-profile/service/feature';
import { Systrace } from 'react-native';
import { getSystemErrorMap } from 'util';

@Resolver()
export class OrgResolver {
    constructor(private readonly OrganisationService: OrganisationService) {}

    @Query(() => OrganisationEntity)
    OrgProfile(@Args("userID") userID: string) : Promise<OrganisationEntity>{
        return this.OrganisationService.getOrgProfile(userID);
    }

    
    @Query(() => OrganisationEntity)
    OrgEditProfile(
        @Args('id') id: string,
        @Args('orgName') name: string,
        @Args('loc') loc: string,
        @Args('picture') pic: string,
        @Args('password') password: string
    ) : Promise<OrganisationEntity> {

        if(id != undefined) {

            if(name == "undefined")
                name = null;
            if(loc == "undefined")
                loc = null;
            if(pic == "undefined")
                pic = null;
            if(password == "undefined")
                password = null;

            return this.OrganisationService.updateDet(id, name, loc, pic, password);
        }

        return null;
    }
}