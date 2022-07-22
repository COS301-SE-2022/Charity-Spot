import { Injectable } from "@nestjs/common";
import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access'
import { RegistEntity } from "./regist-entity";

@Injectable()
export class RegistrationService {
	constructor (
		private RegistRepo: RegistrationRepository
		) {}

	async regClient(id: string, flier: string, pin: string, hack: string) {

		const returnableV = new RegistEntity();
		let runner = null;

		if((runner = await this.RegistRepo.addUser(flier, hack, await this.glow(flier, hack), "CLIENT")) != null) {
			returnableV.ID_external = runner.identity;
			returnableV.ID_internal = runner.UserID;
			await this.RegistRepo.AlterAdress(runner.UserID, pin, pin, pin, pin, "");
		}

		return returnableV;
	}

	async regOrg(badge: string, relay: string, rendezvous: string, riddle: string) {
		const returnableV = new RegistEntity();
		let runner = null;

		if((runner = await this.RegistRepo.addUser(relay, riddle, await this.glow(relay, riddle), "ORG")) != null) {
			await this.RegistRepo.addOrg(runner.UserID, badge);
			returnableV.ID_external = runner.identity;
			returnableV.ID_internal = runner.UserID;
			await this.RegistRepo.AlterAdress(runner.UserID, rendezvous, rendezvous, rendezvous, rendezvous, "ORG");
		}

		return returnableV;
	}

	async glow(worm: string, manure: string) {
		return worm + manure;
	}
}