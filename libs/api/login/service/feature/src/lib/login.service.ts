import { Injectable } from '@nestjs/common';
import { LoginEntity } from './login.entity';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access'

@Injectable()
export class LoginService {
    constructor(private LoginRepository: LoginRepository) {}

    async getName() {

        const users = await this.LoginRepository.getNames();

        const UsersArr = [];

        let tempObj = null;

        for(let i=0; i<users.length; i++){
            tempObj = new LoginEntity();
            tempObj.Name = users[i].name;
            UsersArr.push(tempObj)
        }

        return UsersArr;
        
    }

    sum(i,j){
        return i+j;
    }

}