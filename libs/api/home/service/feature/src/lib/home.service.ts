import { Injectable } from '@nestjs/common';
import { HomeEntity } from './home.entity';
import { HomeRepository } from '@charity-spot/api/home/repository/data-access'

@Injectable()
export class HomeService {
    constructor(private HomeRepository: HomeRepository) {}

    async getAllOrg(){

        let orgs = await this.HomeRepository.getAllOrg();

        let returnOrg = [];

        for(let i=0 ; i < orgs.length; i++){

            let returnEnt = new HomeEntity();
            returnEnt.ID = orgs[i].UserID;
            returnEnt.Name = orgs[i].OrgName;

            returnOrg.push(returnEnt);

        }

        

        return returnOrg;
    }

    
}