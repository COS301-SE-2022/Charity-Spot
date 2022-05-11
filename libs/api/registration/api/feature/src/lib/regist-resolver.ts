import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegistrationService, RegistEntity } from '@charity-spot/api/registration/service/feature'
import { Query } from '@nestjs/common';

@Resolver()
export class RegistrationResolver {
    constructor(private readonly RegistrationService: RegistrationService) {}

	@Query(() => RegistEntity)
	registerORG(
		@Args("org_Name") orgName: string,
		@Args("email") email: string, 
		@Args("location") address: string,
		@Args("password") password: string
	) : Promise<RegistEntity>{
		const userID = await this.RegistrationService.addUser(email, password);
		if(userID > 0) {
			this.RegistrationService.addOrg(userID, orgName);
			this.RegistrationService.alterAddress(userID, address, "", "", "");
		}

		return null;
	}
}