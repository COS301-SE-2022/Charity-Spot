import { Injectable } from "@nestjs/common";
import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access'
import { RegistEntity } from "./regist-entity";
import { LoginService } from "@charity-spot/api/login/service/feature"
import { DonateRepository } from "@charity-spot/api/donate/repository/data-access";

@Injectable()
export class RegistrationService {
	constructor (
		private RegistRepo: RegistrationRepository,
		private readonly LoginService: LoginService
		) {}

	async doesNotExist(email : string, password : string) {
		if(await this.LoginService.validate(email, password) == false)
			return true;
		else 
			return false;
	}

	async addUser(email : string, password : string) {
		if(await this.doesNotExist(email, password) == true) {
			//hash - upcoming

			const user = await this.RegistRepo.addUser(email, password, email+"#");

			return user.UserID;
		}
		else
			return  null;
	}

	async alterNGONum(UserID : string, NGONum: string) {
		return this.RegistRepo.AlterNGONum(UserID, NGONum);
	}

	async alterDescr(userID : string, Descr : string) {
		return this.RegistRepo.AlterDescription(userID, Descr)
	}

	async alterAddress(
		userID : string, 
		address: string,
		address2: string,
		city: string, 
		prov: string
		) {
			return this.RegistRepo.AlterAdress(userID, address, address2, city, prov);
	}

	async addOrg(userID : string, OrgName : string) {
		this.RegistRepo.addOrg(userID, OrgName);

		return "SUCCESS";
	}

	async addPicture(id: string, name: string, picture: string) {
		return null;
	}

	async addDate(date: string) {
		//this.RegistRepo.addDate(date);
	}
}