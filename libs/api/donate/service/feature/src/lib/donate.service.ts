import { Injectable } from '@nestjs/common';
import { DonateEntity } from './donate.entity';
import { DonateRepository } from '@charity-spot/api/donate/repository/data-access'
import { catagory, quality } from '@prisma/client';

@Injectable()
export class DonateService {
    constructor(private donateRepository: DonateRepository) {}

    async donate(id: string, name: string, quantity: number, category: catagory, condition: quality, descr: string){

        //repository actions
        this.donateRepository.editItemName(id, null, name);
        this.donateRepository.editQuantity(id, name, quantity);
        this.donateRepository.editItemType(id, name, category);
        this.donateRepository.editQuality(id, name, condition);
        this.donateRepository.editItemDescription(id, name, descr);

        //David: need to edit Quality type in prismaClient, check donate-resolver.ts

        //return id 
        //NOT NULLABLE
        const temp = new DonateEntity();
        temp.ID = "Donate Working!";
        return temp;
    }
}