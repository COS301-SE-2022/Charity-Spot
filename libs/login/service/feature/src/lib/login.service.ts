import { Injectable } from '@nestjs/common';
import { LoginEntity } from './login.entity';

@Injectable()
export class LoginService {
    constructor() {}

    async getName() {
        let tempObj = new LoginEntity();
        tempObj.Name = "Hello World"
        return tempObj;
    }

}