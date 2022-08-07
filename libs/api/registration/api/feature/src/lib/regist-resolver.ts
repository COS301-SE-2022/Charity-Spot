import { Resolver, Args, Query } from '@nestjs/graphql';
import { RegistrationService, RegistEntity } from '@charity-spot/api/registration/service/feature'

import { FirebaseService } from "@charity-spot/api/shared/services/prisma";

@Resolver()
export class RegistrationResolver {
    constructor(private readonly RegistrationService: RegistrationService, private readonly FirebaseService : FirebaseService) {}

	@Query(() => RegistEntity)
	async registerORG(
		@Args("org_Name") orgName: string,
		@Args("email") email: string, 
		@Args("location") address: string,
		@Args("password") password: string,
		@Args("identity") identity: string,
		@Args("picture") picBase64: string,
	) {

		console.log(identity);

		const userID = await this.RegistrationService.addUser(email, password, identity);

		const temp = new RegistEntity();
		if(userID != null) {
			
			await this.RegistrationService.addOrg(userID, orgName);
			await this.RegistrationService.alterAddress(userID, address, "", "", "");
			temp.ID = userID;

			//console.log("hello world " + picBase64);

			if(picBase64 != "undefined"){

				var imgType = picBase64.substring(
					picBase64.indexOf("/") + 1, 
					picBase64.lastIndexOf(";")
				);
	
				let imgName = "userProfilePic/" + userID + '.' + imgType;
	
				await this.RegistrationService.setItemPicName(userID, imgName);

				console.log("test1");
	
				await this.FirebaseService.uploadFile(picBase64, imgName);

				console.log("test2");
	
				let downLink = await this.FirebaseService.getURLByFilePath(imgName);

				console.log("testtttt");
	
				console.log(downLink);
	
			}
		}
		else
			temp.ID = null;

		return temp;
	}
}
