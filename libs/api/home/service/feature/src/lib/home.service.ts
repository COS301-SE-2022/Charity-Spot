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

            let addObj = await this.HomeRepository.getAddressFromID(orgs[i].AddressID);

            returnEnt.Address = addObj[0].Address;

            returnOrg.push(returnEnt);

        }

        return returnOrg;
    }

    async getAllItems(){

        let temp = new HomeEntity();

        let items = await this.HomeRepository.getAllItems();

        let retItem : any = []

        for(let i=0; i<items.length; i++){

            let temp = new HomeEntity();

            temp.ItemName = items[i].ItemName;
            temp.OrgID = items[i].OrgID;
            temp.Type = items[i].Type;
            temp.Location = items[i].DonoLoc;
            
            retItem.push(temp);
        }

        return retItem;
    }

    
}