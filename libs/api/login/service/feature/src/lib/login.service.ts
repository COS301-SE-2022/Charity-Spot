import { Injectable } from '@nestjs/common';
import { LoginEntity } from './login.entity';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access'

@Injectable()
export class LoginService {
    constructor(private LoginRepository: LoginRepository) {}

    async loginUser(email : string, password: string) {

        console.log(email);

        const users = await this.LoginRepository.validateLogin(email, password);

        const UsersArr = [];

        let tempObj = null;

        for(let i=0; i<users.length; i++){
            tempObj = new LoginEntity();
            tempObj.Name = users[i].email;
            tempObj.UserID = users[i].UserID;
            UsersArr.push(tempObj)
        }

        console.log(UsersArr);

        return UsersArr;

        //console.log(users);
        //return null;
        
    }

    sum(i,j){
        return i+j;
    }

}