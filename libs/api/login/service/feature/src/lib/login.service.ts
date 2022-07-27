import { Injectable } from '@nestjs/common';
import { LoginEntity } from './login.entity';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';

@Injectable()
export class LoginService {
    constructor(private LoginRepository: LoginRepository) {}

    async validate(email : string, password : string) {
        if(await this.LoginRepository.emailExists(email)){
            //return await this.LoginRepository.validateLogin(email, await this.glow_inv(email, password));
            return await this.LoginRepository.validateLogin(email, password);
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

    async glow_inv(worm: string, menure: string) {
        return worm + menure;
    }
}