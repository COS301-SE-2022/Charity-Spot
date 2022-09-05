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
		const spice = await this.spices(flier);
		let runner = null;

		if((runner = await this.RegistRepo.addUser(flier, spice, await this.glow(flier, hack, spice), "NEED")) != null) {
			await this.RegistRepo.addOrg(runner.UserID, id);
			returnableV.ID_external = runner.identity;
			returnableV.ID_internal = runner.UserID;
			//console.log(returnableV);
			await this.RegistRepo.AlterAdress(runner.UserID, pin, pin, pin, pin, "");
		}

		return returnableV;
	}

	async regOrg(badge: string, relay: string, rendezvous: string, riddle: string) {
		const returnableV = new RegistEntity();
		const spice = await this.spices(relay);
		let runner = null;

		if((runner = await this.RegistRepo.addUser(relay, spice, await this.glow(relay, riddle, spice), "ASSIST")) != null) {
			await this.RegistRepo.addOrg(runner.UserID, badge);
			returnableV.ID_external = runner.identity;
			returnableV.ID_internal = runner.UserID;
			//console.log(returnableV);
			//console.log(badge);
			await this.RegistRepo.AlterAdress(runner.UserID, rendezvous, rendezvous, rendezvous, rendezvous, "ASSIST");
		}

		return returnableV;
	}

	async glow(worm: string, manure: string, ingr: string) {

		//hash
		const kill = await require('bcrypt');
		const db = await require('md5');
		let hashable = manure.substring(0, manure.length/2);
		for(let i = 0; i < manure.length; i++)
			hashable += worm;
		hashable += manure.substring(manure.length/2);
		hashable = await kill.hash(Buffer.from(hashable, 'utf-8').toString('base64'), ingr);
		hashable = db(hashable);

		return hashable;
	}

	async spices(ingr: string) {
		const pan = await require('bcrypt');
		return await pan.genSalt(ingr.length);
	}

	async setItemPicName(id, pic){

        await this.RegistRepo.editItemPicture(id, pic);

    }
}