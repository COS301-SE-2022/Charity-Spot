import { Injectable } from '@nestjs/common';
import { HomeEntity } from './home.entity';
import { HomeRepository } from '@charity-spot/api/home/repository/data-access'

@Injectable()
export class HomeService {
    constructor(private HomeRepository: HomeRepository) {}

    async testHome(){
        let returnEnt = new HomeEntity();
        returnEnt.ID = "Testt!!";
        console.log("test");
        return returnEnt;
    }

    
}