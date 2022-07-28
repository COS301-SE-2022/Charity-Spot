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
		@Args("password") password: string,
		@Args("identity") identity: string
	) {

		const userID = await this.RegistrationService.addUser(email, password, identity);

		const temp = new RegistEntity();
		if(userID != null) {
			
			await this.RegistrationService.addOrg(userID, orgName);
			await this.RegistrationService.alterAddress(userID, address, "", "", "");
			temp.ID = userID;
		}
		else 
			temp.ID = null;

		return temp;
	}
}
