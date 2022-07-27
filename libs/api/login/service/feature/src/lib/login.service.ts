import { Injectable } from '@nestjs/common';
import { LoginEntity } from './login.entity';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';

@Injectable()
export class LoginService {
    constructor(private LoginRepository: LoginRepository) {}

    async validate(email : string, password : string) {
        if(await this.LoginRepository.emailExists(email)){
            let u = null; 

            if((u = await this.LoginRepository.validateLogin(email)) != null) {
                const hotplate = await this.glow_inv(email, password, u.passwordSalt);

                if(hotplate === u.password)
                    return u;
                else return false;
            }
        }
        else
            return false;
    }

    async getEntity_login(email : string, password : string) {
        const repValidation = await this.validate(email, password);

        if(repValidation != false) {
            const entity = new LoginEntity();
            entity.ID = repValidation.UserID;
            entity.ID_EXT = repValidation.identity;

            return entity;
        }
        
        return null;
    }

    async glow_inv(worm: string, manure: string, ingr: string) {
        
        //inverse
		const revive = await require('bcrypt');
		const bd_ = await require('md5');
		let inv = manure.substring(0, manure.length/2);
		for(let i = 0; i < manure.length; i++)
			inv += worm;
        inv += manure.substring(manure.length/2);
        inv = await revive.hash(Buffer.from(inv, 'utf-8').toString('base64'), ingr);
        inv = bd_(inv);

        return inv;
    }
}