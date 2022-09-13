import { Injectable } from '@nestjs/common';
import { LoginEntity } from './login.entity';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';
import { invert } from '@charity-spot/api/shared/auth';

@Injectable()
export class LoginService {
    constructor(private LoginRepository: LoginRepository) {}

    async validate(email : string, password : string) {
        if(await this.LoginRepository.emailExists(email)){
            let u = null; 

            if((u = await this.LoginRepository.validateLogin(email)) != null) {
                const hotplate = await invert(email, password, u.passwordSalt);

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
}