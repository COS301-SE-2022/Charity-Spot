import { Resolver, Args, Query } from '@nestjs/graphql';
import { RegistrationService, RegistEntity } from '@charity-spot/api/registration/service/feature'

@Resolver()
export class RegistrationResolver {
    constructor(private readonly RegistrationService: RegistrationService) {}

	@Query(() => RegistEntity)
	async registerORG(
		@Args("org_Name") orgName: string,
		@Args("email") email: string, 
		@Args("location") address: string,
		@Args("password") password: string
	) {
		const userID = await this.RegistrationService.addUser(email, password);

		const temp = new RegistEntity();
		if(userID != null) {
			this.RegistrationService.addOrg(userID, orgName);
			this.RegistrationService.alterAddress(userID, address, "", "", "");
			temp.ID = userID;
		}
		else 
			temp.ID = null;

		return temp;
	}
}
