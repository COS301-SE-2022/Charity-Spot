import { Injectable } from '@nestjs/common';
import { DonateEntity} from './donate.entity';
import { DonateRepository } from '@charity-spot/api/donate/repository/data-access'
import { catagory, quality } from '@prisma/client';

@Injectable()
export class DonateService {
    constructor(private donateRepository: DonateRepository) {}

    async donate(id: string, name: string, quantity: number, category: catagory, condition: quality, descr: string){

        //repository actions
        await this.donateRepository.AddItem(name, id, quantity, condition, category);
        const item = await this.donateRepository.editItemDescription(id, name, descr);
        

        //return id 
        //NOT NULLABLE
        const returnable = new DonateEntity();

        returnable.ItemID = item.ItemID;
        returnable.ID = item.OrgID;
        returnable.Name = item.ItemName;
        returnable.Description = item.Descrition;
        
        
        return returnable;
    }

    async setItemPicName(id, name, pic){

        await this.donateRepository.editItemPicture(id, name, pic);

    }

    async history(id: string) {
        const historyItem = new DonateEntity();

        historyItem.Donations = [];

        const donations = await this.donateRepository.getItemList(id);

        for(const item of donations) {
            const donateItem = new DonateEntity();
            donateItem.ID = id;

            //item details
            donateItem.Name = item.ItemName;
            donateItem.Picture = item.Picture;
            donateItem.Quantity = item.Quantity
            donateItem.Description = item.Descrition;
            donateItem.Quality = item.Quality.toString();
            donateItem.Category = item.Type.toString();

            historyItem.Donations.push(donateItem);
        }

        return historyItem;
    }
}