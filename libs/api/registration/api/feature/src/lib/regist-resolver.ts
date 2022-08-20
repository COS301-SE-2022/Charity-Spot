import { Resolver, Args, Query } from '@nestjs/graphql';
import { RegistrationService, RegistEntity } from '@charity-spot/api/registration/service/feature'

import { FirebaseService } from "@charity-spot/api/shared/services/prisma";

@Resolver()
export class RegistrationResolver {
    constructor(private readonly RegistrationService: RegistrationService) {}
	
	@Query(() => RegistEntity)
	async clientRegist(
		@Args("Name") name: string,
		@Args("Email") email: string,
		@Args("Location") loc: string,
		@Args("Password") secr: string
	) {
		return this.RegistrationService.regClient(name, email, loc, secr);
	}

	@Query(() => RegistEntity)
	async orgRegist(
		@Args("OrgName") o_name: string,
		@Args("OrgEmail") o_email: string,
		@Args("OrgLocation") o_loc: string,
		@Args("OrgPassword") o_secr: string
	) {
		return this.RegistrationService.regOrg(o_name, o_email, o_loc, o_secr);
	}
}