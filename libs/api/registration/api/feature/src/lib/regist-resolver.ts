import { Resolver, Args, Query } from '@nestjs/graphql';
import { RegistrationService, RegistEntity } from '@charity-spot/api/registration/service/feature'
import { base_64_direct } from '@charity-spot/api/shared/auth';
@Resolver()
export class RegistrationResolver {
    constructor(private readonly RegistrationService: RegistrationService, private readonly FirebaseService: FirebaseService) {}
	
	@Query(() => RegistEntity)
	async clientRegist(
		@Args("Name") name: string,
		@Args("Email") email: string,
		@Args("Location") loc: string,
		@Args("Password") secr: string,
		@Args("picture") picLink: string
	) {
		let client = null;
		if((client = await this.RegistrationService.regClient(name, email, loc, secr))!= null) {
			await this.RegistrationService.setItemPicName(client.ID_external, base_64_direct(picLink));
		}

		return client;
	}

	@Query(() => RegistEntity)
	async orgRegist(
		@Args("OrgName") o_name: string,
		@Args("OrgEmail") o_email: string,
		@Args("OrgLocation") o_loc: string,
		@Args("OrgPassword") o_secr: string,
		@Args("OrgPicture") o_pp: string
	) {
		return this.RegistrationService.regOrg(o_name, o_email, o_loc, o_secr);
	}
}