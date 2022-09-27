import { Resolver, Args, Query } from '@nestjs/graphql';
import { RegistrationService, RegistEntity } from '@charity-spot/api/registration/service/feature'
@Resolver()
export class RegistrationResolver {
    constructor(private readonly RegistrationService: RegistrationService) {}
	
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
			await this.RegistrationService.setItemPicName(client.ID_internal, picLink);
		}

		
		return client;
	}
	@Query(() => RegistEntity)
	async orgRegist(
		@Args("OrgName") o_name: string,
		@Args("OrgEmail") o_email: string,
		@Args("OrgLocation") o_loc: string,
		@Args("OrgPassword") o_secr: string,
		@Args("OrgPicture") o_picLink: string
	) {
		let org = null;
		if((org = await this.RegistrationService.regOrg(o_name, o_email, o_loc, o_secr))!= null) {
			await this.RegistrationService.setItemPicName(org.ID_internal, o_picLink);
		}

		return org;
	}

	@Query(() => Boolean)
	async validateEmail(
		@Args("email") email: string
	) {
		return await this.RegistrationService.validateEmail(email);
	}

	@Query(() => Boolean)
	async checkCode(
		@Args("code") code: string
	) {
		return await this.RegistrationService.checkCode(code);
	}
}