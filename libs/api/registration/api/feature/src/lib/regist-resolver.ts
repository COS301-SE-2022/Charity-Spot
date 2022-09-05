import { Resolver, Args, Query } from '@nestjs/graphql';
import { RegistrationService, RegistEntity } from '@charity-spot/api/registration/service/feature'

import { FirebaseService } from "@charity-spot/api/shared/services/prisma";

@Resolver()
export class RegistrationResolver {
    constructor(private readonly RegistrationService: RegistrationService, private readonly FirebaseService: FirebaseService) {}
	
	@Query(() => RegistEntity)
	async clientRegist(
		@Args("Name") name: string,
		@Args("Email") email: string,
		@Args("Location") loc: string,
		@Args("Password") secr: string,
		@Args("picture") picBase64: string
	) {
		let returnV = await this.RegistrationService.regClient(name, email, loc, secr);
		console.log(returnV);

		if(picBase64 != "undefined"){

            var imgType = picBase64.substring(
                picBase64.indexOf("/") + 1, 
                picBase64.lastIndexOf(";")
            );

            let imgName = "userProfilePic/" + returnV.ID_internal + '.' + imgType;

            await this.RegistrationService.setItemPicName(returnV.ID_internal, imgName);

            await this.FirebaseService.uploadFile(picBase64, imgName);

            let downLink = await this.FirebaseService.getURLByFilePath(imgName);

            console.log(downLink);

        }
        else{
            await this.RegistrationService.setItemPicName(returnV.ID_internal, "undefined");
        }

		return returnV;
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